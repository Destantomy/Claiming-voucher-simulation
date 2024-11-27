import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { VouchersContextProvider } from './context/VoucherContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VouchersContextProvider>
        <App />
      </VouchersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
