import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Loaded from the repo root .env, one level above BE/.
// This module must be imported before anything that reads process.env at the
// top level: ES module imports are hoisted, so calling dotenv.config() inline
// in index.ts would run *after* the route modules had already been evaluated.
const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(here, '../../../.env') });

export const JWT_SECRET = process.env.JWT_SECRET;
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
export const PORT = Number(process.env.PORT) || 3000;
