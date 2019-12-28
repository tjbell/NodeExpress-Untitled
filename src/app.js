const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

var accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8');

const accounts = JSON.parse(accountData);

var userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8');

const users = JSON.parse(userData);

app.get('/', (req, res) => {
	res.render('index', { title: 'Account Summary', accounts });
});

app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }));
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }));
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }));
app.get('/transfer', (req, res) => res.render('account', { account: accounts.transfer }));

app.post('/transfer', (req, res) => {
	// New balances for accounts that user would transfer into && out of:
	accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
	accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);
	const accountsJSON = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'UTF8');
	res.render('transfer', { message: 'Transfer Completed' });
});

// Near your existing routes in app.js create a get route with a URL path of /payment that renders the payment view and passes in an object with a key-value pair of account: accounts.credit.

app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }));
app.post('/payment', (req, res) => {
	accounts.credit.balance -= req.body.amount;
	accounts.credit.available += parseInt(req.body.amount, 10);
	const accountsJSON = JSON.stringify(accounts, null, 4);
	fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'UTF8');
	res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

app.get('/profile', (req, res) => res.render('profile', { user: users[0] }));

app.listen(3000, () => console.log('PS Project running on port 3000'));
