import https from 'node:https';

const apiKey = "goldapi-3f8ab98911363ed96ee6a0f47ac39b81-io";
const symbol = "XAU";
const curr = "GBP";
const date = "";

const options = {
    hostname: 'www.goldapi.io',
    path: `/api/${symbol}/${curr}${date}`,
    method: 'GET',
    headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json'
    }
};
export async function getPriceFromApi(symbol, curr, date) {

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', async () => {
           const parsedData = await JSON.parse(data);
            console.log('current price', parsedData.price);
            return parsedData.price;
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error.message);
    });

    req.end();
}