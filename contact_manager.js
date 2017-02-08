'use strict'

const _ = require('underscore');

module.exports = class ContactManager {
    constructor() {
        this.contacts = [];
    }

    getContact(firstName) {
        return _.find(this.contacts, (contact) => {
            return contact.firstName === firstName;
        });
    }

    getAllContacts() {
        return this.contacts;
    }

    createContact(contactInfo){
        if(!contactInfo) 
            throw {code: 400, status:"error", message: `bad parameter contactInfo ${contactInfo}`};

        this.contacts.push(contactInfo);
    }

    editContact(firstName, contactInfo){
        let contact = this.getContact(firstName);
        if(!contact)
            throw {code: 200, status: "error", message: "contact not found"};

        _.each(_.keys(contactInfo), (key) => {
            contact[key] = contactInfo[key];
        });
        return contact;
    }

    deleteContact(firstName){
        this.contacts = this.contacts.filter((contact) => {
            return contact.firstName !== firstName;
        });
    }

    deleteAllContacts(){
        this.contacts = [];
    }

}
