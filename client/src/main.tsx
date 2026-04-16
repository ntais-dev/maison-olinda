import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import App from './App.tsx'
import './styles/global.css'

const initialOptions = {
  "client-id": "test", // Replace with your actual client ID in production
  currency: "EUR",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </PayPalScriptProvider>
  </React.StrictMode>,
)
