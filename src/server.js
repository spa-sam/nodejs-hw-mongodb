// src/server.js

import express from 'express';
import cors from 'cors';
import pino from 'pino';
import contactsRouter from './routers/contactsRouter.js';

const logger = pino();

export default function setupServer() {
  const app = express();

  // Налаштування cors та логгера pino
  app.use(cors());
  app.use((req, res, next) => {
    logger.info(req);
    next();
  });

  // Реєстрація роута для контактів
  app.use('/contacts', contactsRouter);

  // Обробка неіснуючих роутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Запуск серверу на порті, вказаному через змінну оточення PORT або 3000
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
