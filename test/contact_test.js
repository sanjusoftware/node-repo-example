const assert = require('assert');
const ContactManager = require('../contact_manager');
const contactManager = new ContactManager();

describe("Contact manager", function () {
    beforeEach(function () {
        contactManager.createContact({
            firstName: "mamaz",
            lastName: "mulya",
            age: 23,
            photo: "image.png",
            other: {
                ssn: 12121
            }
        });
    });

    afterEach(function () {
        contactManager.deleteAllContacts();
    });

    describe('Get contact', function () {
        it('should be able to get list of all contacts', function () {
            let allContacts = contactManager.getAllContacts();
            assert.equal(allContacts.length, 1);
            assert.equal(allContacts[0].firstName, "mamaz");
        });

        it('should be able to get a contact based on firstname', function () {
            let contact = contactManager.getContact("mamaz");
            assert.equal(contact.firstName, "mamaz");
        });
    });

    describe('Create contact', function () {
        it('should be able to create new contact', function () {
            let contact = contactManager.getContact("mamaz");
            assert.notEqual(null, contact);
            assert.equal("mamaz", contact.firstName);
        });

        it('should be able to alter previous user if it exists', function () {
            contactManager.createContact({
                firstName: "mamaz",
                lastName: "mulya",
                age: 23,
                photo: "picture.png",
                other: null
            });
            let contact = contactManager.getContact("mamaz");
            assert.notEqual(contact, null);
            assert.equal(contact.other, null);
            assert.equal(contact.photo, "picture.png");
        });
    });

    describe('Edit contact', function () {
        it('should be able to edit a contact given firstname', function () {
            let updatedContact = contactManager.editContact("mamaz", {
                lastName: "lalalalal",
                other: {
                    ssn: 000000,
                    girlfriend: "N/A"
                }
            });
            assert.equal(updatedContact.other.ssn, 000000);
            assert.equal(updatedContact.lastName, "lalalalal");
        });

        it('should throw an error if you input inexistent user', function () {
            assert.throws(function () {
                contactManager.editContact("nicole", {
                    lastName: "lalalalal",
                    other: {
                        ssn: 000000,
                        girlfriend: "N/A"
                    }
                });
            });
        })
    });

    describe('Delete contact', function () {
        it('should be able to delete a contact', function () {
            contactManager.deleteContact("mamaz");
            let contact = contactManager.getContact("mamaz");
            assert.equal(contact, null);
        });

        it('should be able to delete all contact', function () {
            contactManager.deleteAllContacts();
            let contacts = contactManager.getAllContacts();
            assert.equal(contacts.length, 0);
        });
    });

});