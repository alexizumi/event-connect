// src/pages/Events/EventDetails.tsx
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddToGoogleCalendarButton from '../../components/AddToGoogleCalendarButton';
import { useAuth } from '../../hooks/useAuth'; // Assuming you have an auth hook
import { useEvents, type Event } from '../../hooks/useFirestore';
import { useRegistrations } from '../../hooks/useRegistrations';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent } = useEvents();
  const { user } = useAuth();
  const {
    registerForEvent,
    checkRegistration,
    cancelRegistration,
    loading: registrationLoading,
    error: registrationError,
  } = useRegistrations();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) {
        setError('Event ID is missing');
        setLoading(false);
        return;
      }

      try {
        const eventData = await getEvent(id);
        if (eventData) {
          setEvent(eventData);

          // Check if user is registered for this event
          if (user) {
            const registered = await checkRegistration(id);
            setIsRegistered(registered);
          }
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEvent, user, checkRegistration]);

  const handleGoBack = () => {
    navigate('/events');
  };

  const handleSignUp = async () => {
    if (!user) {
      // Redirect to login page with a return URL
      navigate(`/login?redirect=/events/${id}`);
      return;
    }

    if (!event || !id) return;

    try {
      const result = await registerForEvent(id, event.title);
      if (result) {
        setIsRegistered(true);
        setSnackbarMessage('Successfully registered for the event!');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error during registration:', err);
    }
  };

  const handleCancelRegistration = async () => {
    if (!id) return;

    try {
      const success = await cancelRegistration(id);
      if (success) {
        setIsRegistered(false);
        setSnackbarMessage('Registration canceled');
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error('Error canceling registration:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mb: 2 }}
        >
          Back to Events
        </Button>
        <Alert severity="error">{error || 'Event not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBack}
        sx={{ mb: 2 }}
      >
        Back to Events
      </Button>

      <Paper elevation={3} sx={{ p: 3 }}>
        {event.imageUrl && (
          <Box
            sx={{
              height: 300,
              backgroundImage: `url(${event.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1,
              mb: 3,
            }}
          />
        )}

        <Typography variant="h3" component="h1" gutterBottom>
          {event.title}
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          {new Date(event.date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body1"
          paragraph
          sx={{ whiteSpace: 'pre-line', mt: 3 }}
        >
          {event.description}
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Created by: {event.createdBy}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Added on: {event.createdAt.toDate().toLocaleDateString()}
          </Typography>
        </Box>

        {registrationError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {registrationError}
          </Alert>
        )}

        <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
          {user && isRegistered && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelRegistration}
              disabled={registrationLoading}
            >
              {registrationLoading ? (
                <CircularProgress size={24} />
              ) : (
                'Cancel Registration'
              )}
            </Button>
          )}
          {user && !isRegistered && (
            <Button
              variant="contained"
              onClick={handleSignUp}
              disabled={registrationLoading}
            >
              {registrationLoading ? (
                <CircularProgress size={24} />
              ) : (
                'Register'
              )}
            </Button>
          )}
          {!user && (
            <Button
              variant="contained"
              onClick={() => navigate(`/login?redirect=/events/${id}`)}
            >
              Sign Up to Register
            </Button>
          )}

          <AddToGoogleCalendarButton event={event} />
        </Box>
        <Box sx={{ mt: 3, mb: 4 }}></Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Container>
  );
}
