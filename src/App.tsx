// src/App.tsx

import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import AdminPage from './pages/Dashboard/Dashboard';
import EditEvent from './pages/Events/EditEvent';
import EventDetails from './pages/Events/EventDetails';
import EventsPage from './pages/Events/Events';
import HomePage from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/edit" element={<EditEvent />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
