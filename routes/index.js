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

/**
 * @swagger
 * /contact/list:
 *   get:
 *     tags:
 *       - Contacts
 *     description: Returns all contacts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of contacts
 */
router.get('/contact/list', (req, res) => {
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

/**
 * @swagger
 * /contact/{firstname}:
 *   get:
 *     tags:
 *       - Contacts
 *     description: Returns a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: contacts' first name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single contact
 */
router.get('/contact/:firstname', (req, res) => {
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

/**
 * @swagger
 * /contact/{firstname}:
 *   put:
 *     tags: 
 *       - Contacts
 *     description: Updates a single contact
 *     produces: 
 *        - application/json
 *     parameters:
 *       - name: contact
 *         in: body
 *         description: Fields for the Contact resource
 *     responses:
 *       200:
 *         description: Successfully updated
 */
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

/**
 * @swagger
 * /contact:
 *   post:
 *     tags:
 *       - Contacts
 *     description: Creates a new contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contact
 *         description: Contact object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/contact', (req, res) => {
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

/**
 * @swagger
 * /contact:
 *   delete:
 *     tags:
 *       - Contacts
 *     description: Deletes all contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: contact
 *         description: Contact object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/contact', (req, res) => {
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

/**
 * @swagger
 * /contact/{firstname}:
 *   delete:
 *     tags:
 *       - Contacts
 *     description: Deletes a single contact
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstname
 *         description: Contacts' first name
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/contact/:firstname', (req, res) => {
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