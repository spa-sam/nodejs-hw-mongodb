import express from 'express';
import cors from 'cors';
import pino from 'pino';
import createError from 'http-errors';
import contactsRouter from './routers/contacts.js';

const logger = pino();

export default function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(req);
    next();
  });

  app.use('/contacts', contactsRouter);

  // Middleware для обробки неіснуючих маршрутів (notFoundHandler)
  app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
  });

  // Middleware для обробки помилок (errorHandler)
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
      status: status,
      message: 'Something went wrong',
      data: err.message,
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
