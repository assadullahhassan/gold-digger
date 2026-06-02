import https from 'node:https';

const apiKey = "goldapi-3f8ab98911363ed96ee6a0f47ac39b81-io";
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
export async function getPriceFromApi() {

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