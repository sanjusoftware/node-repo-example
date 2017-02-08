"use strict"

const express = require('express');
const bodyParser = require('body-parser'); 
const ContactManager = require('./contact_manager');

const contactManager = new ContactManager();
const PORT = process.env.PORT || 3000;

const getErrorObject = function (error) {
    return {
        code: error.code || 500,
        status: "error",
        message: error.message || error.toString()
    };
};

let app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

app.get('/favicon.ico', function (req, res) {
    return res.sendStatus(204);
});

app.get('/contact/list', (req, res) => {
    try {
        let contacts = contactManager.getAllContacts();
        res.json({
            status: 200,
            message: "ok",
            data: contacts
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.get('/contact/:firstname', (req, res) => {
    try {
        let firstName = req.params.firstname;
        let contact = contactManager.getContact(firstName);
        res.json({
            status: 200,
            message: "ok",
            data: contact ? [contact] : []
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.post('/contact/:firstname', (req, res) => {
    try {
        let firstName = req.params.firstname;
        let contact = contactManager.deleteContact(firstName);
        res.json({
            status: 200,
            message: "ok"
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.put('/contact/:firstname', (req, res) => {
    let firstName = req.params.firstname;
    let contactInfo = req.body;

    try {
        let contact = contactManager.editContact(firstName, contactInfo);
        res.json(contact);
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.post('/contact', (req, res) => {
    let contactInfo = req.body;

    try {
        let contact = contactManager.createContact(contactInfo);
        res.json({
            code: "200",
            status: "ok"
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.delete('/contact', (req, res) => {
    try {
        contactManager.deleteAllContacts();
        res.json({
            code: "200",
            status: "ok"
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.delete('/contact/:firstname', (req, res) => {
    try {
        let firstName = req.params.firstname;
        contactManager.deleteContact(firstName);
        res.json({
            code: "200",
            status: "ok"
        });
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}...`);
});