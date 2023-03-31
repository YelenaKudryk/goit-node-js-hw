const fs = require('fs/promises')
const path = require('path');
const contactsPath = path.resolve("db", "contacts.json");
const { nanoid } = require('nanoid');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);    
    } catch (error) {
        console.log(error.message);
    }
}

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contactById = contacts.find(contact => contact.id === contactId);
        return contactById || null
    } catch (error) {
         console.log(error.message)
    }
}

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const index = contacts.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null
        }
        const [result] = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return result;
         } catch (error) {
         console.log(error.message)
    }
}

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
    } catch (error) {
         console.log(error.message)
    }
}

const updateContact = async (contactId, data) => {
    try {
        const contacts = await listContacts();
         const index = contacts.findIndex(contact => contact.id === contactId);
        if (index === -1) {
            return null
        }
        contacts[index] = { contactId, ...data };
         await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return contacts[index];
           } catch (error) {
         console.log(error.message)
    }
}

module.exports = {
    listContacts, getContactById, removeContact, addContact, updateContact
}

