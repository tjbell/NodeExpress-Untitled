const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts, users, writeJSON} = require('./data');
const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = new express();
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);



app.get('/profile', (req, res) => 
  res.render('profile', {user: users[0]})
);


app.get('/',(req, res) => 
  res.render('index', { title: 'Account Summary', accounts: accounts })
);



app.listen(3000, () => console.log('PS Project Running on port 3000!'));

