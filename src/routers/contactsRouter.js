// src/routers/contactsRouter.js

import express from 'express';
import contactsService from '../services/contactsService.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:contactId', async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 'error',
        message: `Contact with id ${contactId} not found`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
