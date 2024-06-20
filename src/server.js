// src/server.js

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsService from './services/contactsService.js';

const logger = pino();

export default function setupServer() {
  const app = express();

  // Налаштування cors та логгера pino
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(req);
    next();
  });

  // Обробка маршруту GET /contacts
  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await contactsService.getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  });

  // Обробка маршруту GET /contacts/:contactId
  app.get('/contacts/:contactId', async (req, res) => {
    try {
      const contactId = req.params.contactId;
      const contact = await contactsService.getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: `Contact with id ${contactId} not found`,
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  });

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ status: 404, message: 'Not found' });
  });

  // Запуск серверу на порті, вказаному через змінну оточення PORT або 3000
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
