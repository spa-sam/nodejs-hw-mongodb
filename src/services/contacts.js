import Contact from '../db/contactModel.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllContacts = async (
  userId,
  page,
  perPage,
  sortParams,
  filterParams,
) => {
  const skip = (page - 1) * perPage;
  const { sortBy, sortOrder } = sortParams;

  const sortOptions = {
    [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1,
  };

  const contacts = await Contact.find({ ...filterParams, userId })
    .sort(sortOptions)
    .skip(skip)
    .limit(perPage);
  const totalItems = await Contact.countDocuments({ ...filterParams, userId });
  return { contacts, totalItems };
};

const getContactById = async (userId, contactId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

const createContact = async (userId, contactData) => {
  const newContact = new Contact({ ...contactData, userId });
  await newContact.save();
  return newContact;
};

const updateContact = async (userId, contactId, updateData) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updateData },
    { new: true, runValidators: true },
  );
  return contact;
};

const deleteContact = async (userId, contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

export default {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
