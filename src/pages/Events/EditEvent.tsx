// src/pages/Events/EditEvent.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  price?: number;
  eventLink?: string;
}

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    price: '',
    eventLink: '',
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${id}`);
      if (response.ok) {
        const eventData = await response.json();
        setEvent(eventData);
        setFormData({
          title: eventData.title || '',
          date: eventData.date || '',
          description: eventData.description || '',
          location: eventData.location || '',
          price: eventData.price?.toString() || '',
          eventLink: eventData.eventLink || '',
        });
      } else {
        throw new Error('Failed to fetch event');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.title.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarOpen(true);
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        title: formData.title.trim(),
        date: formData.date,
        description: formData.description.trim(),
        location: formData.location.trim() || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        eventLink: formData.eventLink.trim() || undefined,
      };

      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setSnackbarMessage('Event updated successfully');
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate(`/events/${id}`);
        }, 1500);
      } else {
        throw new Error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      setSnackbarMessage('Failed to update event. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading event details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/events')}
          sx={{ mt: 2 }}
        >
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(`/events/${id}`)}
        sx={{ mb: 3 }}
      >
        Back to Event Details
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Event
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="title"
            label="Event Title *"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="date"
            label="Event Date *"
            type="date"
            fullWidth
            variant="outlined"
            value={formData.date}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
          />

          <TextField
            margin="dense"
            name="description"
            label="Description *"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="location"
            label="Location (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="price"
            label="Price (optional)"
            type="number"
            fullWidth
            variant="outlined"
            value={formData.price}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            sx={{ mb: 2 }}
            helperText="Enter 0 for free events, leave empty if not applicable"
          />

          <TextField
            margin="dense"
            name="eventLink"
            label="Event Link (optional)"
            type="url"
            fullWidth
            variant="outlined"
            value={formData.eventLink}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
            helperText="Full URL including https://"
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/events/${id}`)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={saving ? <CircularProgress size={16} /> : <SaveIcon />}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
