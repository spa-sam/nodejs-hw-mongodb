import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { router } from './routers/index.js';
import { errorHandler } from './middlewares/errorHandlers.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';

const logger = pino();

export default function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use((req, res, next) => {
    logger.info(req);
    next();
  });

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(cookieParser());
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
