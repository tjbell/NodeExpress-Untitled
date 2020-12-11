const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express');
const { Recoverable } = require('repl');

const app = new express();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));

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

app.get('/profile', (req, res) => 
  res.render('profile', {user: users[0]})
);

app.get('/transfer', (req, res) => 
  res.render('transfer')
);

app.get('/',(req, res) => 
  res.render('index', { title: 'Account Summary', accounts: accounts })
);

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = accounts[req.body.from].balance - parseInt(req.body.amount);
  accounts[req.body.to].balance = accounts[req.body.to].balance + parseInt(req.body.amount);
  res.render('transfer', {message: 'Transfer Completed'});
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));

