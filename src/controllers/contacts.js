import createError from 'http-errors';
import contactsService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query);
  const filterParams = parseFilterParams(req.query);

  const { contacts, totalItems } = await contactsService.getAllContacts(
    req.user._id,
    page,
    perPage,
    sortParams,
    filterParams,
  );

  const paginationData = calculatePaginationData(page, perPage, totalItems);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      ...paginationData,
      ...sortParams,
      filter: filterParams,
    },
  });
};

export const getContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const contact = await contactsService.getContactById(req.user._id, contactId);

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber) {
    throw createError(400, 'Name and phoneNumber are required');
  }

  const newContact = await contactsService.createContact(req.user._id, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updatedContact = await contactsService.updateContact(
    req.user._id,
    contactId,
    {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    },
  );

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contactsService.deleteContact(
    req.user._id,
    contactId,
  );

  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
