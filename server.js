import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { getContentType } from './utils/getContentType.js';
import { serveStatic } from './utils/serveStatic.js';
import { getPriceFromApi } from './utils/getPriceFromApi.js';

const PORT = 3000;
const publicDir = path.join(process.cwd(), 'public');



const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
           const price = await getPriceFromApi()
           if (price) {
            console.log('current price', price);
            res.setHeader('Content-Type', 'application/json');
            // res.end(JSON.stringify({ price }));
            res.JSON({ price });
           }
           
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