import { EventEmitter } from 'events';
import { sendEmail } from '../utils/sendEmail.js';

export const emailEventEmitter = new EventEmitter();

emailEventEmitter.on('investmentAdded', async (investmentData) => {
    const { amount, price, ounces, date } = investmentData;
    const emailText = `A new investment has been added with the following details:\nAmount: $${amount}\nPrice: $${price}\nOunces: ${ounces}\nDate: ${date}`;
    await sendEmail('kalisana257@gmail.com', 'New Investment Added', emailText); 
});