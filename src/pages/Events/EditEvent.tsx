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
import { deleteField } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../hooks/useFirestore';

export default function EditEvent() {
  const { id } = useParams<{ id: string }>();
  const { getEvent, updateEvent } = useEvents();
  const navigate = useNavigate();

  // const [event, setEvent] = useState<Event | null>(null);
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
    eventUrl: '',
    imageUrl: '',
    createdBy: '',
  });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      if (!id) {
        throw new Error('Event ID is required');
      }
      setLoading(true);
      setError(null);
      const event = await getEvent(id);

      if (!event) {
        throw new Error('Event not found');
      }

      // setEvent(event);
      setFormData({
        title: event.title || '',
        date: event.date || '',
        description: event.description || '',
        location: event.location || '',
        price: event.price?.toString() || '',
        eventUrl: event.eventUrl || '',
        imageUrl: event.imageUrl || '',
        createdBy: event.createdBy || '',
      });
      setLoading(false);
      return event;
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details');
      setLoading(false);
      return null;
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

    if (
      !formData.title.trim() ||
      !formData.date ||
      !formData.description.trim()
    ) {
      setSnackbarMessage('Please fill in all required fields');
      setSnackbarOpen(true);
      return;
    }

    if (formData.price && isNaN(parseFloat(formData.price))) {
      setSnackbarMessage('Price must be a valid number');
      setSnackbarOpen(true);
      return;
    }

    if (
      formData.eventUrl.trim() &&
      !/^https?:\/\//.test(formData.eventUrl.trim())
    ) {
      setSnackbarMessage('Event URL must start with http:// or https://');
      setSnackbarOpen(true);
      return;
    }

    if (
      formData.imageUrl?.trim() &&
      !/^https?:\/\//.test(formData.imageUrl.trim())
    ) {
      setSnackbarMessage('Image URL must start with http:// or https://');
      setSnackbarOpen(true);
      return;
    }

    if (!id) {
      setError('Event ID is required for updating');
      setSnackbarMessage('Event ID is required for updating');
      setSnackbarOpen(true);
      return;
    }

    setSaving(true);

    try {
      const updateData: any = {
        title: formData.title.trim(),
        date: formData.date,
        description: formData.description.trim(),
        location: formData.location.trim() || deleteField(),
        price:
          formData.price && !isNaN(parseFloat(formData.price))
            ? parseFloat(formData.price)
            : deleteField(),
        eventUrl: formData.eventUrl.trim() || deleteField(),
        imageUrl: formData.imageUrl?.trim() || deleteField(),
        createdBy: formData.createdBy.trim() || deleteField(),
      };

      const response = await updateEvent(id, updateData);
      console.log('Event updated successfully:', response);

      setSnackbarMessage('Event updated successfully!');
      setSnackbarOpen(true);
      navigate(`/events/${id}`);
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
            label="Event Title"
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
            label="Event Date"
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
            label="Description"
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
            name="imageUrl"
            label="Image URL (optional)"
            fullWidth
            variant="outlined"
            value={formData.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            margin="dense"
            name="location"
            label="Location"
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
            name="eventUrl"
            label="Event Link (optional)"
            type="url"
            fullWidth
            variant="outlined"
            value={formData.eventUrl}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
            helperText="Full URL including https://"
          />
          <TextField
            margin="dense"
            name="createdBy"
            label="Organizer Name (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.createdBy}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            helperText="Name of the person or organization that created the event"
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
