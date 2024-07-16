import React, { useContext } from 'react';
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import { Call, MoreVert } from '@mui/icons-material';
import { themeContext } from '../context/ThemeContext';

const ChatWindow = ({ selectedChat }) => {
    const { mode } = useContext(themeContext);

    if (!selectedChat) {
        return <Typography variant="h6" align="center" sx={{ mt: 4 }}></Typography>;
    }



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>

            <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: mode === 'dark' ? '#1e1e1e' : '#eee', color: mode === 'dark' ? '#fff' : 'black' }}>

                <Avatar sx={{ bgcolor: '#509fe7', marginRight: 2 }}>{selectedChat.chat.creator && selectedChat.chat.creator.name ? selectedChat.chat.creator.name.charAt(0) : 'U'}</Avatar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>{selectedChat.chat.creator.name}</Typography>
                <IconButton sx={{ color: mode === 'dark' ? '#fff' : 'black', fontSize: '13px' }}>
                    <Call />
                </IconButton>
                <IconButton sx={{ color: mode === 'dark' ? '#fff' : 'black' }}>
                    <MoreVert />
                </IconButton>
            </Box>

            <Box sx={{ padding: 2, backgroundColor: mode === 'dark' ? '#333333' : 'white', flexGrow: 1, overflowY: 'auto' }}>
                {selectedChat.messages.map((message, index) => (
                    <Box key={index} sx={{ mb: 1, display: 'flex', flexDirection: 'column', alignItems: message.sender_id === 1 ? 'flex-start' : 'flex-end' }}>
                        <Box
                            sx={{
                                bgcolor: message.sender_id === 1 ? '#e0e0e0' : '#509fe7',
                                color: message.sender_id === 1 ? 'black' : 'white',
                                padding: 1,
                                borderRadius: 1,
                                maxWidth: '60%',
                            }}
                        >
                            <Typography variant="body2">{message.message}</Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ChatWindow;
