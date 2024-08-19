import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 
import './style.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root using the root element
const root = ReactDOM.createRoot(rootElement);

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
