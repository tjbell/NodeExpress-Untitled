const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Index' })
});

app.listen(PORT, () => console.log('PS Project running on port ' + PORT));