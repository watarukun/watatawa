const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let posts = [];

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/post', (req, res) => {
  const { name, message } = req.body;
  if (name && message) {
    posts.unshift({ name, message });
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
