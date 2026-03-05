/**
 * ┌──────────────────────────────────────────────────────────────┐
 *  Handler Registry — Combines all mock API handlers
 * └──────────────────────────────────────────────────────────────┘
 *
 * HOW TO ADD NEW HANDLERS:
 *   1. Create a new file in src/mocks/handlers/ (e.g. products.ts)
 *   2. Export an array of http handlers
 *   3. Import and spread it into the array below
 */

import { leadsHandlers } from './leads';

export const handlers = [
  ...leadsHandlers,
];
