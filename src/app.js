const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//set the views directory
app.set('views', path.join(__dirname, 'views')); //__dirname jako element z node-a
app.set('view engine', 'ejs'); //use ejs as our view engine

//tell express, how to find out public directory
app.use(express.static(path.join(__dirname, 'public')));

//app.get - 2 parametry - url i callback
app.get('/', (req, res) => res.render('index', { title: 'Index' }) );

//Tworzenie serwera http
app.listen(3000, () => console.log('Server is running on 3000'));
