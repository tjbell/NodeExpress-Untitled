const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts, users, writeJSON} = require('./data');
//const { json } = require('express');
//const { Recoverable } = require('repl');


const app = new express();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));


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

app.get('/payment', (req, res) => 
  res.render('payment', {accounts: accounts.credit})
);

app.post('/payment', (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'UTF8');
  res.render('payment', {message: 'Payment Successful', account: accounts.credit});
});

app.get('/',(req, res) => 
  res.render('index', { title: 'Account Summary', accounts: accounts })
);

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance -= parseInt(req.body.amount);
  accounts[req.body.to].balance += parseInt(req.body.amount);
  
  res.render('transfer', {message: 'Transfer Completed'});
});

app.listen(3000, () => console.log('PS Project Running on port 3000!'));

