'use strict'

const _ = require('underscore');

class ContactManager {
    constructor() {
        let contacts = [];
    }

    getContact(firstname) {
        return this.contacts.filter((contact) => {
            contact.firstname = firstname;
        });
    }

    getAllContacts() {
        return this.contacts;
    }

    createContact(contactInfo){
        if(!contactInfo) 
            throw {code: 400, status:"error", message: `bad parameter ${contactInfo}`};

        this.contact.push(contactInfo);
    }

    editContact(firstname, contactInfo){
        let contact = getContact(firstname);
        if(!contact)
            throw {code: 200, status: "error", message: "contact not found"};

        _.each(_.keys(contactInfo), (key) => {
            contact[key] = contactInfo[key];
        });
        return contact;
    }
}
