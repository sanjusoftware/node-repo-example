"use strict"

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const routes = require('./routes/index');
const PORT = process.env.PORT || 3000;

let app = express();

// swagger definition
let swaggerDefinition = {
    info: {
        title: 'Simple Contact API',
        version: '1.0.0',
        description: 'Demonstrating how to create API using Express and Swagger as the documentation tool.',
    },
    host: 'localhost:3000',
    basePath: '/',
};

// options for the swagger docs
let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
let swaggerSpec = swaggerJSDoc(options);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'api-docs')));

app.use('/', routes);

// serve swagger
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});