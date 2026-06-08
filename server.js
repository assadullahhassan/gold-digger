import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { getContentType } from './utils/getContentType.js';
import { serveStatic } from './utils/serveStatic.js';
import { getCurrentPrice } from './utils/getPriceFromApi.js';
import { addInvestmentLog } from './utils/addNewLog.js';
import { pdfEventEmitter } from './events/pdfEvents.js';
import { emailEventEmitter } from './events/emailEvents.js';

// import dotenv from 'dotenv';

// dotenv.config();

const PORT = 3000;
const publicDir = path.join(import.meta.dirname, 'public');



const server = http.createServer(async (req, res) => {
    console.log('Received request:', req.method, req.url);
    
    if (req.url === '/api') {
        if (req.method === 'GET') {

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');

           const intervalId = setInterval(async () => {
                const price = await getCurrentPrice()
                // const price = 1000
                console.log('current price2', price);

                res.write('data: ' + JSON.stringify({ price: price }) + '\n\n');
            }, 2000);

            req.on('close', () => {
                clearInterval(intervalId);
                res.end();
            });

        //    const price = await getCurrentPrice()
        //    if (price) {
        //     console.log('current price2', price);
        //     res.setHeader('Content-Type', 'application/json');
        //     res.end(JSON.stringify({ price }));
        //    }
        }
    }
    else if (req.method === 'POST') {
            if(req.url === '/api/invest') {
                console.log('Received investment request');
                let body = '';

                for await (const chunk of req) {
                    body += chunk;
                }

                try {
                    const { amount, price, ounces, date } = JSON.parse(body);
                    addInvestmentLog({ amount, price, ounces, date });
                    pdfEventEmitter.emit('investmentAdded', { amount, price, ounces, date });
                    emailEventEmitter.emit('investmentAdded', { amount, price, ounces, date });
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true }));
                } catch (err) {
                    console.error('Error parsing investment data:', err);
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Invalid investment data' }));
                }

            }
        }
    else if (!req.url.startsWith('/api')) {
       return await serveStatic(req, res, publicDir)
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});