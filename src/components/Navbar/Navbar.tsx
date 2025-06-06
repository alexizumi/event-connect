// src/components/Navbar/Navbar.tsx

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
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
            }}
          >
            EventConnect
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button
              component={RouterLink}
              to="/"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              Home
            </Button>
            <Button
              component={RouterLink}
              to="/events"
              sx={{ color: 'white', display: 'block', mx: 1 }}
            >
              Events
            </Button>
            {/* {isAdmin && (
              <Button
                component={RouterLink}
                to="/admin"
                sx={{ color: 'white', display: 'block', mx: 1 }}
              >
                Admin
              </Button>
            )} */}
          </Box>

          <Box>
            {user ? (
              <>
                <Typography variant="body1" sx={{ display: 'inline', mr: 2 }}>
                  Hi, {user.displayName}
                </Typography>
                <Button color="inherit" onClick={signOut}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
