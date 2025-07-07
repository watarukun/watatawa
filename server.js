const http = require('http');
const fs = require('fs');
const path = require('path');

// サーバーを作成
const server = http.createServer((req, res) => {
  // ルートへのリクエストがあった場合にHTMLファイルを提供
  if (req.url === '/') {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf8');
    });
  } else {
    // 他のリクエストは404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// ポート番号とホスト
const PORT = 3000;
const HOST = 'localhost';

// サーバーを起動
server.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}/`);
});
