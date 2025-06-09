// src/components/Navbar/Navbar.tsx

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
          }}
        >
          EventConnect
        </Typography>
      </Box>

      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerClose}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.light + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.light + '30',
                  },
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    color: theme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {user ? (
          <>
            <ListItem>
              <ListItemText
                primary={`Hi, ${user.displayName || 'User'}`}
                sx={{
                  textAlign: 'center',
                  '& .MuiListItemText-primary': {
                    color: theme.palette.text.secondary,
                    fontSize: '0.9rem',
                  },
                }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  signOut();
                  handleDrawerClose();
                }}
                sx={{
                  justifyContent: 'center',
                  color: theme.palette.error?.main || '#d32f2f',
                }}
              >
                <ListItemText
                  primary="Logout"
                  sx={{
                    textAlign: 'center',
                    '& .MuiListItemText-primary': {
                      fontWeight: 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              component={RouterLink}
              to="/login"
              onClick={handleDrawerClose}
              sx={{
                justifyContent: 'center',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                mx: 2,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <ListItemText
                primary="Login"
                sx={{
                  textAlign: 'center',
                  '& .MuiListItemText-primary': {
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Container maxWidth={false}>
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              EventConnect
            </Typography>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: 'white',
                      display: 'block',
                      mx: 1,
                      position: 'relative',
                      '&::after':
                        location.pathname === item.path
                          ? {
                              content: '""',
                              position: 'absolute',
                              bottom: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '80%',
                              height: '2px',
                              backgroundColor: theme.palette.secondary.main,
                              borderRadius: '1px',
                            }
                          : {},
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {user ? (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        display: 'inline',
                        mr: 2,
                        color: theme.palette.secondary.light,
                        fontWeight: 500,
                      }}
                    >
                      Hi, {user.displayName || 'User'}
                    </Typography>
                    <Button
                      color="inherit"
                      onClick={signOut}
                      sx={{
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    color="inherit"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            )}

            {isMobile && (
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
          '& .MuiModal-root': {
            position: 'fixed',
          },
          '& .MuiBackdrop-root': {
            position: 'fixed',
          },
        }}
        disablePortal={false}
        hideBackdrop={false}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
