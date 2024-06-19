import setupServer from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

async function startApp() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

startApp();
