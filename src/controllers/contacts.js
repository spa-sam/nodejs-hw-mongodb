import createError from 'http-errors';
import contactsService from '../services/contacts.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      });
    } else {
      next(error);
    }
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber) {
      throw createError(400, 'Name and phoneNumber are required');
    }

    const newContact = await contactsService.createContact({
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
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const updatedContact = await contactsService.updateContact(contactId, {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      });
    } else {
      next(error);
    }
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactsService.deleteContact(contactId);

    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' },
      });
    } else {
      next(error);
    }
  }
};
