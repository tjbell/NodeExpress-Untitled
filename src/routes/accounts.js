const express = require('express');
const router = express.Router();
const {accounts} = require('../data');

router.get('/savings',(req,res) => {
    res.render('account', {account:accounts.savings});//object with key value pair
});
router.get('/checking', (req,res) =>{
    res.render('account', {account:accounts.checking});//object with key value pair
});
router.get('/credit', (req,res) =>{
    res.render('account', {account:accounts.credit});//object with key value pair
});
module.exports = router;