import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { worker } from './mocks/browser.tsx';

worker.start().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />

    </StrictMode>,
  );
});

