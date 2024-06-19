// src/services/contactsService.js

import Contact from '../db/contactModel.js';

const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export default { getAllContacts, getContactById };
