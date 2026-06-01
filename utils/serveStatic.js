import fs from 'node:fs';
import path from 'node:path';
import { getContentType } from './getContentType.js';

export async function serveStatic(req, res, publicDir) {
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);

    // Prevent directory traversal attacks
    if (!filePath.startsWith(publicDir)) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }

        // Determine MIME type
        const contentType = getContentType(filePath);

        // Read and send the file
        res.setHeader('Content-Type', contentType);
        fs.createReadStream(filePath).pipe(res);
    });
}