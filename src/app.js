const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const ACCOUNT_DATA = fs.readFileSync(
  path.join(__dirname, 'json', 'accounts.json'), 'utf8'
);
const USER_DATA = fs.readFileSync(
  path.join(__dirname, 'json', 'users.json'), 'utf8'
);

const accounts = JSON.parse(ACCOUNT_DATA);
const users = JSON.parse(USER_DATA);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts });
});

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.listen(PORT, () => console.log('PS Project running on port ' + PORT));