import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import ChatRoom from '../components/ChatRoom';
const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/chat" element={<h1 className='bg-amber-700'>Hello world</h1>} />
    <Route path="/chatroom" element={<ChatRoom />} />
    <Route path="*" element={<h1>Error page</h1>} />
  </Routes>
  )
}

export default AppRoutes
