import { FC } from 'react';

import {
    Box,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
  } from '@mui/material';

import HistoryIcon from '@mui/icons-material/History';
import PostAddIcon from '@mui/icons-material/PostAdd';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import { Link, useLocation } from 'react-router-dom';

const simpleBarStyles = {
    '.simplebarScrollbar::before': {
      opacity: 0.1,
      width: '5px',
      right: '2px'
    },
    '.simplebarTrack.simplebarVertical': {
      width: '8px',
      borderRadius: '4px',
    },
    height: 'calc(100% - 64px)',
    overflow: 'auto'
};

interface DrawerContentProps {
    onMobileClose?: () => void;
    isMobile?: boolean;
}

const menuItems = [
    {
        name: 'Setting',
        categories: [
            { text: 'Add Form', icon: <PostAddIcon />, path: '/' },
            { text: 'History', icon: <HistoryIcon />, path: '/history' },
        ],
    },
];

const DrawerContent: FC<DrawerContentProps> = ({ onMobileClose, isMobile }) => {
    const location = useLocation();

    return (
        <Box sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <Box sx={{ flexShrink: 0 }}>
                <Toolbar sx={{ paddingBlock: 2 }}>
                    <img 
                        src="bki.png" 
                        alt="Logo" 
                        style={{ height: '60px', margin:'auto' }} 
                    />
                </Toolbar>
            </Box>
            
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                <SimpleBar style={simpleBarStyles}>
                    <Box sx={{ py: 2 }}>
                        {menuItems.map((item) => (
                            <Box key={item.name} sx={{ mb: 3 }}>
                                <Typography 
                                    sx={{
                                        fontSize: '12px',
                                        fontWeight: 'medium',
                                        px: 3,
                                        mb: 1,
                                        color: 'rgb(140, 140, 140)'
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <List sx={{ p: 0 }}>
                                    {item.categories.map((category) => (
                                        <ListItem key={category.text} disablePadding>
                                            <ListItemButton 
                                                component={Link}
                                                to={category.path}
                                                selected={location.pathname === category.path}
                                                onClick={() => isMobile && onMobileClose?.()}
                                                sx={{
                                                    minHeight: 48,
                                                    px: 2.5,
                                                    '&.Mui-selected': {
                                                        backgroundColor: '#E6F7FF',
                                                        color: '#1890FF',
                                                        borderRight: '2px solid rgb(24, 144, 255)',
                                                        '&:hover': {
                                                            backgroundColor: '#E6F7FF',
                                                        },
                                                    },
                                                }}
                                            >
                                                <ListItemIcon 
                                                    sx={{ 
                                                        minWidth: 40,
                                                        mr: 1,
                                                        color: '#1890FF',
                                                    }}
                                                >
                                                    {category.icon}
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography 
                                                        variant="body1" 
                                                        sx={{ 
                                                            fontWeight: location.pathname === category.path ? 'medium' : 'normal'
                                                        }}
                                                    >
                                                        {category.text}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        ))}
                    </Box>
                </SimpleBar>
            </Box>
        </Box>
    );
};

export default DrawerContent;