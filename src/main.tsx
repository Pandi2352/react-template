import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

/**
 * ┌─────────────────────────────────────────────────────────┐
 *  MSW (Mock Service Worker) Bootstrap
 * └─────────────────────────────────────────────────────────┘
 *
 * In development, MSW intercepts all API requests and returns
 * mock data — no backend server needed.
 *
 * HOW IT WORKS:
 *   1. In dev mode, we dynamically import the MSW worker
 *   2. worker.start() registers a Service Worker that intercepts fetch calls
 *   3. Only AFTER the worker is ready, we render the React app
 *   4. In production, this block is skipped entirely (tree-shaken out)
 *
 * TO DISABLE MOCKS: Set VITE_ENABLE_MOCKS=false in .env
 * TO USE REAL API:   Set VITE_ENABLE_MOCKS=false and configure VITE_API_BASE_URL
 */
async function enableMocking() {
  const enableMocks = import.meta.env.VITE_ENABLE_MOCKS !== 'false';

  if (!import.meta.env.DEV || !enableMocks) {
    return; // skip in production or when mocks are disabled
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass', // let non-mocked requests pass through
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
