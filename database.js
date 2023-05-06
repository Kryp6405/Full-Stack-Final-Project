require('dotenv').config();
const Database  = require('dbcmps369');

class MyDatabase {
    constructor() {
        this.db = new Database();
    }

    async init() {
        await this.db.connect();
        await this.db.schema('Contacts',[
            {name: 'id', type: 'INTEGER'},
            {name: 'first_name', type: 'TEXT'},
            {name: 'last_name', type: 'TEXT'},
            {name: 'address', type: 'TEXT'},
            {name: 'phone', type: 'TEXT'},
            {name: 'email', type: 'TEXT'},
            {name: 'title', type: 'TEXT'},
            {name: 'contact_by_mail', type: 'TEXT'},
            {name: 'contact_by_email', type: 'TEXT'},
            {name: 'contact_by_phone', type: 'TEXT'},
            {name: 'latitude', type: 'NUMERIC'},
            {name: 'longitude', type: 'NUMERIC'}
        ], 'id');
        await this.db.schema('Users',[
            {name: 'id', type: 'INTEGER'},
            {name: 'first_name', type: 'TEXT'},
            {name: 'last_name', type: 'TEXT'},
            {name: 'username', type: 'TEXT'},
            {name: 'password', type: 'TEXT'}
        ], 'id');
    }
    
    async createContact(contact, address, latitude, longitude) {
        const id = await this.db.create('Contacts', [
            {column: 'first_name', value: contact.first_name},
            {column: 'last_name', value: contact.last_name},
            {column: 'address', value: address},
            {column: 'phone', value: contact.phone},
            {column: 'email', value: contact.email},
            {column: 'title', value: contact.title},
            {column: 'contact_by_mail', value: contact.contact_by_mail},
            {column: 'contact_by_email', value: contact.contact_by_email},
            {column: 'contact_by_phone', value: contact.contact_by_phone},
            {column: 'latitude', value: latitude},
            {column: 'longitude', value: longitude}
        ]);
        return id;
    }

    async getContacts() {
        const contacts = await this.db.read('Contacts', []);
        return contacts;
    }

    async getContactByID(id) {
        const contact = await this.db.read('Contacts', [{column: 'id', value: id}]);
        return contact;
    }

    async updateContact(contact, address, latitude, longitude, id){
        return await this.db.update('Contacts', [
            {column: 'first_name', value: contact.first_name},
            {column: 'last_name', value: contact.last_name},
            {column: 'address', value: address},
            {column: 'phone', value: contact.phone},
            {column: 'email', value: contact.email},
            {column: 'title', value: contact.title},
            {column: 'contact_by_mail', value: contact.contact_by_mail},
            {column: 'contact_by_email', value: contact.contact_by_email},
            {column: 'contact_by_phone', value: contact.contact_by_phone},
            {column: 'latitude', value: latitude},
            {column: 'longitude', value: longitude}
        ], [{column: 'id', value: id}]);
    }

    async deleteContact(contact) {
        return await this.db.delete('Contacts', [{column: 'id', value: contact.id}])
    }

    async createUser(user, username, password) {
        const id = await this.db.create('Users', [
            {column: 'first_name', value: user.first_name},
            {column: 'last_name', value: user.last_name},
            {column: 'username', value: username},
            {column: 'password', value: password}
        ]);
        return id;
    }

    async getUserByUsername(username) {
        const user = await this.db.read('Users', [{column: 'username', value: username}]);
        if(user.length > 0)
            return user[0];
        else
            return undefined;
    }

    async getUserByID(id) {
        const user = await this.db.read('Users', [{column: 'id', value: id}]);
        if(user.length > 0)
            return user[0];
        else
            return undefined;
    }
}

module.exports = MyDatabase;