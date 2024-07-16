import React, { useState } from 'react'
import './App.css';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/Chatwindow';

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
    };

  return (
    <Box sx={{display:'flex',height:'100vh'}}>
      <Sidebar onSelectChat={handleSelectChat}/>
      <ChatWindow selectedChat={selectedChat}/>
    </Box>
  )
}

export default App