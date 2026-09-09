// A tiny local server for the Orbit static site.
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const root = __dirname;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

const server = http.createServer((request, response) => {
  const urlPath = request.url === '/' ? '/index.html' : request.url.split('?')[0];
  const filePath = path.normalize(path.join(root, urlPath));

  // Only serve files from this project directory.
  if (!filePath.startsWith(root)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const status = error.code === 'ENOENT' ? 404 : 500;
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(status === 404 ? 'Page not found' : 'Unable to load this file');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, { 'Content-Type': types[extension] || 'application/octet-stream' });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Orbit is running at http://localhost:${port}`);
  console.log('Press Ctrl + C to stop the server.');
});
