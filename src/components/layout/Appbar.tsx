import { useState } from 'react';

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LPJForm from '../forms/LPJForm';
import History from '../tables/History';
import DrawerContent from '../common/DrawerContent';

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';

const drawerWidth = 260;

interface Props {
  window?: () => Window;
}

export default function Appbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
   <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              boxShadow: 1,
              width: '100%',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        )}
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* Mobile Drawer */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <DrawerContent 
              onMobileClose={handleDrawerToggle}
              isMobile={true}
            />
          </Drawer>

          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <DrawerContent isMobile={false}/>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            maxWidth: '100%',
            overflowX: 'hidden',
            ...(isMobile ? {
              mt: `${theme.mixins.toolbar.minHeight}px`,
              px: 2,
            } : {
            }),
          }}
        >
          <Routes>
            <Route path="/" element={<LPJForm />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Box>
      </Box>
   </Router>
  );
}