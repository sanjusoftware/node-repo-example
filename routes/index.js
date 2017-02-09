const express = require('express');
const router = express.Router();

const ContactManager = require('../contact_manager');
const contactManager = new ContactManager();

const getErrorObject = (error) => {
    return {
        code: error.code || 500,
        status: "error",
        message: error.message || error.toString()
    };
};

router.get('/favicon.ico', function(req, res) {
    return res.sendStatus(204);
});

router
    .get('/contact/list', (req, res) => {
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
    })
    .get('/contact/:firstname', (req, res) => {
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

router.put('/contact/:firstname', (req, res) => {
    let firstName = req.params.firstname;
    let contactInfo = req.body;

    try {
        let contact = contactManager.editContact(firstName, contactInfo);
        res.json(contact);
    } catch (error) {
        res.json(getErrorObject(error));
    }
});

router
    .post('/contact', (req, res) => {
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
    })
    .post('/contact/:firstname', (req, res) => {
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

router
    .delete('/contact', (req, res) => {
        try {
            contactManager.deleteAllContacts();
            res.json({
                code: "200",
                status: "ok"
            });
        } catch (error) {
            res.json(getErrorObject(error));
        }
    })
    .delete('/contact/:firstname', (req, res) => {
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

module.exports = router;