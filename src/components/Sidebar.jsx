import React, { useContext, useEffect, useState } from 'react';
import { Menu, Search } from '@mui/icons-material';
import { Avatar, Badge, Box, Drawer, IconButton, InputAdornment, List, ListItem, ListItemText, Menu as MenuComponent, MenuItem, Switch, TextField, Typography} from '@mui/material';
import { themeContext } from '../context/ThemeContext';
import axios from 'axios';
import './componentcss/Sidebar.css';


const Sidebar = ({ onSelectChat }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState([]);
    const { mode, toggleTheme } = useContext(themeContext);
   

    useEffect(() => {
        axios.get('https://devapi.beyondchats.com/api/get_all_chats?page=1').then(response => {
            if (response.data.status === 'success') {
                setChats(response.data.data.data);

            }
        }).catch(error => {
            console.error("error fetching details", error);
        })
    }, []);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleClickChat = (chat) => {
        setActiveChat(chat);
        axios.get(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat.id}`).then(response=>{
          if(response.data.status === 'success'){
            onSelectChat({ chat, messages: response.data.data });
          }
        }).catch(error=>{
            console.error("error fetching messages",error);
        })
    }

    return (
        <Drawer className="scrollbar-custom"
            variant="permanent"
            sx={{
                width: 400,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 400,
                    boxSizing: 'border-box',
                    backgroundColor: mode === 'dark' ? '#1e1e1e' : 'white',
                    color: mode === 'dark' ? '#fff' : '#000',
                },
                
            }}
        >
            <Box sx={{ padding: 2 }} display="flex" flexDirection="row">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleMenuClick}
                >
                    <Menu sx={{ color: mode === 'dark' ? '#fff' : '#000' }} />
                </IconButton>
                <MenuComponent
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem>
                        <Typography variant="body2">Dark Mode</Typography>
                        <Switch checked={mode === 'dark'} onChange={toggleTheme} />
                    </MenuItem>
                </MenuComponent>
                <Box sx={{ flexGrow: 1, ml: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search"
                        sx={{
                            backgroundColor: 'transparent',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                overflow: 'hidden',
                                backgroundColor: mode === 'dark' ? '#333' : 'white',
                                input: { color: mode === 'dark' ? '#fff' : '#000' },
                            },

                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search style={{ color: mode === 'dark' ? '#fff' : '#000' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Box>
            <List sx={{ padding: 0 }}>
                {chats.map((chat) => (
                    <ListItem key={chat.id} sx={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px 15px', cursor: 'pointer', backgroundColor: activeChat && activeChat.id === chat.id ? (mode === 'dark' ? '#a699e3' : '#ccc') : 'transparent',
                        '&:hover': {
                            backgroundColor: mode === 'dark' ? '#775fc7' : '#ddd',
                        },
                    }} onClick={() => handleClickChat(chat)}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#509fe7', marginRight: 2 }}>{chat.creator && chat.creator.name ? chat.creator.name.charAt(0) : 'U'}</Avatar>
                            <Box>
                                <ListItemText primary={chat.creator.name} secondary={chat.status} sx={{ color: mode === 'dark' ? '#fff' : '#000' }} />
                            </Box>
                        </Box>
                        <Box display="flex" flexDirection="column" gap="11px">
                            <Typography variant="caption" sx={{ color: '#aaa' }}>
                                {new Date(chat.updated_at).toLocaleDateString()}
                            </Typography>
                            <Badge badgeContent={chat.msg_count} color="primary" sx={{marginRight:'10px'}} >
                            </Badge>
                        </Box>

                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar;
