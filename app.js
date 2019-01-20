'use strict';
 
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
 
// register parser middlewear
app.use(bodyParser.text());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "OPTIONS, HEAD, GET, POST, PUT");
  next();
});
   
require('./routes')(app);

app.listen(3000, () => {
  console.log('Server up!');
});