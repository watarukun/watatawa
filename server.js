const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let posts = []; // ← ファイルじゃなくてメモリに保存

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 投稿一覧取得
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 投稿受信
app.post('/post', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    posts.unshift({ name, message });
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
