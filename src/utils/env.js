// src/utils/env.js

import dotenv from 'dotenv';

dotenv.config();

export function env(key) {
  return process.env[key];
}
