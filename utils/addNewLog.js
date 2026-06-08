import path from 'node:path';
import fs from 'node:fs';

import { getLogs } from './getLogs.js';


export function addInvestmentLog(investmentData) {
    try {
        const logsPath = path.join('logs', 'logs.txt');
        const existingLogs = getLogs();
        const newLogEntry = `Investment of £${investmentData.amount} for ${investmentData.ounces} oz at £${investmentData.price}/oz on ${investmentData.date}\n`;
        const updatedLogs = existingLogs + newLogEntry;
        fs.writeFileSync(logsPath, updatedLogs, 'utf8');
    } catch (err) {
        console.error('Error writing to logs:', err);
    }   
}