import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import ChatRoom from '../components/ChatRoom';
import MyFeeds from '../components/MyFeeds';
const AppRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/myfeeds" element={<MyFeeds />} />
    <Route path="/chatroom" element={<ChatRoom />} />
    <Route path="*" element={<h1>Error page</h1>} />
  </Routes>
  )
}

export default AppRoutes
