import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './config/Approutes.jsx';
import { ToastContainer,Zoom } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <ToastContainer position="top-center" transition={Zoom} />
     <AppRoutes />
    </BrowserRouter>
 
);
