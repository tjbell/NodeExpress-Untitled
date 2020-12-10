const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express');

const app = new express();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

const accountData = fs.readFileSync(path.join('src','json','accounts.json'), 'utf-8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.join('src','json','users.json'), 'utf-8');
const users = JSON.parse(userData);

app.get('/savings', (req, res) => 
  res.render('account', {account: accounts.savings})
);

app.get('/checking', (req, res) => 
  res.render('account', {account: accounts.checking})
);

app.get('/credit', (req, res) => 
  res.render('account', {account: accounts.credit})
);

app.get('/',(req, res) => 
  res.render('index', { title: 'Accounts summary', accounts: accounts })
);

app.listen(3000, () => console.log('PS Project Running on port 3000!'));

