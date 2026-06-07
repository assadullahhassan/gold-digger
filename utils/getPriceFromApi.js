import https from 'node:https';
import 'dotenv/config';

const apiKey = process.env.GOLDAPI;
const symbol = "XAU";
const curr = "GBP";
const date = "";
let currentPrice = null;

const options = {
    hostname: 'www.goldapi.io',
    path: `/api/${symbol}/${curr}${date}`,
    method: 'GET',
    headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
    }
};

async function getPriceFromApi() {

   return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const parsedData = JSON.parse(data);
                currentPrice = parsedData.price;
                console.log('current price1', currentPrice);
                resolve(currentPrice); 
            });
        });

        req.on('error', (error) => {
            console.error('Error:', error.message);
            reject(error);
        });

        req.end();
    });
}

export async function getCurrentPrice() {
     try {
        const price = await getPriceFromApi();
        return price;
    } catch (error) {
        console.error('Error fetching price:', error);
        return null;
    }
}