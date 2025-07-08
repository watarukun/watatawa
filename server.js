const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const port = 3000;
const postsFile = 'posts.json';

// JSONファイルがなければ初期化
if (!fs.existsSync(postsFile)) {
  fs.writeFileSync(postsFile, '[]');
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // HTMLページ
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile('post.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading post.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  
  // 投稿取得API
  } else if (req.method === 'GET' && parsedUrl.pathname === '/posts') {
    fs.readFile(postsFile, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('[]');
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });

  // 投稿送信処理
  } else if (req.method === 'POST' && parsedUrl.pathname === '/post') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsed = querystring.parse(body);
      const name = parsed.name;
      const message = parsed.message;

      fs.readFile(postsFile, (err, data) => {
        const posts = err ? [] : JSON.parse(data);
        posts.unshift({ name, message }); // 新しい投稿を先頭に
        fs.writeFile(postsFile, JSON.stringify(posts, null, 2), () => {
          // リダイレクトでトップに戻す
          res.writeHead(302, { 'Location': '/' });
          res.end();
        });
      });
    });

  // ファイルなし
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
