import { EventEmitter } from 'events';
import { generateInvestmentSummary } from '../utils/generatePdf.js';

export const pdfEventEmitter = new EventEmitter();

pdfEventEmitter.on('investmentAdded', async (investmentData) => {
    await generateInvestmentSummary(investmentData);
});