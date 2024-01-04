var express = require('express');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var shopify = require('./routes/shopify');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/shopify', shopify);

module.exports = app;
