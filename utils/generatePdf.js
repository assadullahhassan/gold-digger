import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

const doc = new PDFDocument();

export function generateInvestmentSummary({ amount, price, ounces, date }) {
    const filePath =path.join('logs', `investment-summary-${Date.now()}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('Investment Summary', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Amount Invested: £${amount}`);
    doc.text(`Price per Ounce: £${price}`);
    doc.text(`Ounces Purchased: ${ounces} oz`);
    doc.text(`Date of Investment: ${date}`);

    doc.end();
}
