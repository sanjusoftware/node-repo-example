"use strict"

const express = require('express');

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/favicon.ico', function(req, res) {
    return res.sendStatus(204);
});

app.get('/contact/list', (req, res) => {

});

app.put('/contact/', (req, res) => {

});

app.post('/contact/list', (req, res) => {

});

app.listen(3000, function() {
	console.log("App listening on port 3000...");
});