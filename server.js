import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { getContentType } from './utils/getContentType.js';
import { serveStatic } from './utils/serveStatic.js';
import { getCurrentPrice } from './utils/getPriceFromApi.js';

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
                console.log('current price2', price);

                res.write('data: ' + JSON.stringify({ price: price }) + '\n\n');
            }, 5000);

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
        else if (req.method === 'POST') {
            
        }
    }
    else if (!req.url.startsWith('/api')) {
       return await serveStatic(req, res, publicDir)
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});