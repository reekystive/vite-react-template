import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.tsx';
import './global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
