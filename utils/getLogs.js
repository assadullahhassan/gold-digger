import fs from 'node:fs';
import path from 'node:path';

export function getLogs() {
    try {
        const logsPath = path.join('logs', 'logs.txt');
        return fs.readFileSync(logsPath, 'utf8');
    } catch (err) {
        console.error('Error reading logs:', err);
        return 'No logs available';
    }
}