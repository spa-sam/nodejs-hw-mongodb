import Contact from '../db/contactModel.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllContacts = async (page, perPage, sortParams, filterParams) => {
  const skip = (page - 1) * perPage;
  const { sortBy, sortOrder } = sortParams;

  const sortOptions = {
    [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1,
  };

  const contacts = await Contact.find(filterParams)
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage);
  const totalItems = await Contact.countDocuments(filterParams);
  return { contacts, totalItems };
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const createContact = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

const updateContact = async (contactId, updateData) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return contact;
};

const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
