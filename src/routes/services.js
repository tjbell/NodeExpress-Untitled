const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/payment', (req, res) =>
  res.render('payment', { accounts: accounts.credit })
);

router.post('/payment', (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

router.get('/transfer', (req, res) =>
  res.render('transfer')
);

router.post('/transfer', (req, res) => {
  accounts[req.body.from].balance -= parseInt(req.body.amount);
  accounts[req.body.to].balance += parseInt(req.body.amount);
  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
});

module.exports = router;
