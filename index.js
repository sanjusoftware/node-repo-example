"use strict"
const express = require('express');
const bodyParser = require('body-parser'); 
const ContactManager = require('./contact_manager');
const contactManager = new ContactManager();

let getErrorObject = function (error) {
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

app.get('/contact/:username', (req, res) => {
    try {
        let username = req.params.username;
        let contact = contactManager.getContact(username);
        res.json({
            status: 200,
            message: "ok",
            data: [contact]
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

app.listen(3000, function () {
    console.log("App listening on port 3000...");
});