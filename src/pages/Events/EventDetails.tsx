// src/pages/Events/EventDetails.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Link,
  Paper,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddToGoogleCalendarButton from '../../components/AddToGoogleCalendarButton';
import { useAuth } from '../../hooks/useAuth';
import { useEvents, type Event } from '../../hooks/useFirestore';
import { useRegistrations } from '../../hooks/useRegistrations';
import { getEventImageLarge } from '../../utils/imageHelpers';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent } = useEvents();
  const { user, isAdmin } = useAuth();
  const { deleteEvent } = useEvents();
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteEvent = async () => {
    if (!id) {
      setError('Event ID is missing');
      return;
    }
    setDeleting(true);
    try {
      const success = await deleteEvent(id);

      if (success) {
        navigate('/events', {
          state: {
            message: 'Event deleted successfully',
            severity: 'success',
          },
        });
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to delete event. Please try again.';
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleEditEvent = () => {
    if (!id) {
      setError('Event ID is missing');
      return;
    }
    const event = getEvent(id);
    if (!event) {
      setError('Event not found');
      return;
    }
    navigate(`/events/${id}/edit`);
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

  {
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
          <Box
            sx={{
              height: 300,
              backgroundImage: `url(${getEventImageLarge(event.imageUrl)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 1,
              mb: 3,
            }}
          />

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

          {/* New Event Details Section */}
          <Box sx={{ my: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {event.location && (
              <Chip
                icon={<LocationOnIcon />}
                label={event.location}
                variant="outlined"
                sx={{ fontSize: '0.9rem' }}
              />
            )}

            {event.price !== undefined && event.price !== null && (
              <Chip
                icon={<CurrencyPoundIcon />}
                label={
                  event.price === 0 ? 'Free' : `£${event.price.toFixed(2)}`
                }
                variant="outlined"
                color={event.price === 0 ? 'success' : 'primary'}
                sx={{ fontSize: '0.9rem' }}
              />
            )}

            {event.eventUrl && (
              <Chip
                icon={<LinkIcon />}
                label="Event Link"
                variant="outlined"
                component="a"
                href={
                  event.eventUrl.startsWith('http')
                    ? event.eventUrl
                    : `https://${event.eventUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                clickable
                sx={{
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              />
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body1"
            paragraph
            sx={{ whiteSpace: 'pre-line', mt: 3 }}
          >
            {event.description}
          </Typography>

          {(event.location || event.eventUrl) && (
            <>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Event Information
                </Typography>

                {event.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>Location:</strong> {event.location}
                    </Typography>
                  </Box>
                )}

                {event.eventUrl && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LinkIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      <strong>More Info:</strong>{' '}
                      <Link
                        href={
                          event.eventUrl.startsWith('http')
                            ? event.eventUrl
                            : `https://${event.eventUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Event Page
                      </Link>
                    </Typography>
                  </Box>
                )}
              </Box>
            </>
          )}

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Organizer: {event.createdBy}
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

          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
              {user && isRegistered && (
                <AddToGoogleCalendarButton event={event} />
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {isAdmin && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEditEvent}
                    size="small"
                    sx={{ minWidth: 'auto' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteDialogOpen(true)}
                    size="small"
                    sx={{ minWidth: 'auto' }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 3, mb: 4 }}></Box>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Delete Event</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete "{event?.title}"? This action
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEvent}
              color="error"
              variant="contained"
              disabled={deleting}
              startIcon={
                deleting ? <CircularProgress size={16} /> : <DeleteIcon />
              }
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}
