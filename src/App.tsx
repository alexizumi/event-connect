// src/App.tsx

import { Help } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import About from './pages/About/About';
import AccessibilityPage from './pages/Accessibility/Accessibility';
import LoginPage from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import CommunityGuidelines from './pages/CommunityGuidelines/CommunityGuidelines';
import Contact from './pages/Contact/Contact';
import Cookies from './pages/Cookies/Cookies';
import AdminPage from './pages/Dashboard/Dashboard';
import EditEvent from './pages/Events/EditEvent';
import EventDetails from './pages/Events/EventDetails';
import EventsPage from './pages/Events/Events';
import FAQ from './pages/FAQ/FAQ';
import HomePage from './pages/Home/Home';
import Pricing from './pages/Pricing/Pricing';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';

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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route
              path="/community-guidelines"
              element={<CommunityGuidelines />}
            />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;
