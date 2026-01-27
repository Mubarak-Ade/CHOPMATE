import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import {GlobalContext} from './context/GlobalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContext>
        <App />
      </GlobalContext>
    </BrowserRouter>
  </StrictMode>
);
