// /src/pages/Events/Events.tsx
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { useCallback, useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/EventCard';
import { useAuth } from '../../hooks/useAuth';
import { useEvents, type Event } from '../../hooks/useFirestore';

export default function Events() {
  const { events, loading, error, getEvents, addEvent } = useEvents();
  const { isAdmin } = useAuth();

  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const eventsPerPage = 6;

  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    imageUrl: '',
    createdBy: 'Organiser Name',
    location: '',
    price: 0,
    eventUrl: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchEvents = useCallback(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];

    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'recent':
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        default:
          return 0;
      }
    });

    setFilteredEvents(result);
  }, [events, searchTerm, sortBy]);

  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);
  const displayedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage,
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNewEventDialog = () => {
    setOpenNewEventDialog(true);
  };

  const handleCloseNewEventDialog = () => {
    setOpenNewEventDialog(false);
    setNewEventData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      imageUrl: '',
      createdBy: 'Current User',
      location: '',
      price: 0,
      eventUrl: '',
    });
    setSubmitError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const numericValue = value === '' ? 0 : parseFloat(value);
      setNewEventData((prev) => ({
        ...prev,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      }));
    } else {
      setNewEventData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitNewEvent = async () => {
    if (
      !newEventData.title.trim() ||
      !newEventData.date ||
      !newEventData.description.trim() ||
      !newEventData.createdBy.trim() ||
      !newEventData.location.trim() ||
      newEventData.price === null ||
      newEventData.price === undefined ||
      newEventData.price < 0
    ) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const eventData = {
        title: newEventData.title.trim(),
        date: newEventData.date,
        description: newEventData.description.trim(),
        createdBy: newEventData.createdBy.trim(),
        location: newEventData.location.trim(),
        price: Number(newEventData.price),
        eventUrl: newEventData.eventUrl.trim(),
        ...(newEventData.imageUrl.trim() && {
          imageUrl: newEventData.imageUrl.trim(),
        }),
        ...(newEventData.eventUrl.trim() && {
          eventUrl: newEventData.eventUrl.trim(),
        }),
      };

      await addEvent(eventData);

      handleCloseNewEventDialog();
      fetchEvents();
    } catch (error) {
      console.error('Error adding new event:', error);
      setSubmitError('Failed to add event. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h3" component="h1">
          Events
        </Typography>
        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenNewEventDialog}
          >
            Add New Event
          </Button>
        )}
      </Box>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Search events"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-label">Sort by</InputLabel>
              <Select
                labelId="sort-by-label"
                value={sortBy}
                label="Sort by"
                onChange={(e) => setSortBy(e.target.value)}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  disableScrollLock: true,
                }}
              >
                <MenuItem value="date">Event Date (newest first)</MenuItem>
                <MenuItem value="title">Title (A-Z)</MenuItem>
                <MenuItem value="recent">Recently Added</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {displayedEvents.length === 0 ? (
        <Alert severity="info">No events found matching your criteria.</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayedEvents.map((event, index) => {
              return (
                <Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={`${event.id}-${index}`}
                >
                  <EventCard
                    id={event.id || ''}
                    title={event.title}
                    date={new Date(event.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    imageUrl={event.imageUrl}
                    description={event.description}
                  />
                </Grid>
              );
            })}
          </Grid>

          {pageCount > 1 && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={openNewEventDialog}
        onClose={handleCloseNewEventDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.title}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            placeholder="Enter the event title"
            helperText="Enter a descriptive title for the event"
          />
          <TextField
            margin="dense"
            name="date"
            label="Event Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newEventData.date}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0],
            }}
            helperText="Select the date of the event"
          />
          <TextField
            margin="dense"
            name="description"
            label="Event Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.description}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            sx={{ mb: 2 }}
            placeholder="Enter a detailed description of the event"
            helperText="Provide a detailed description of the event"
          />
          <TextField
            margin="dense"
            name="imageUrl"
            label="Image URL (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.imageUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            helperText="Enter a valid image URL or leave empty for default"
            placeholder="https://example.com/image.jpg"
            required={false}
          />
          <TextField
            margin="dense"
            name="location"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.location}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            required
            placeholder="Enter the event location"
            helperText="Enter the location of the event"
          />
          <TextField
            margin="dense"
            name="price"
            label="Price (0 for free events)"
            type="number"
            fullWidth
            variant="outlined"
            value={newEventData.price}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              step: 0.01,
            }}
            sx={{ mb: 2 }}
            required
            helperText="Enter 0 for free events"
          />
          <TextField
            margin="dense"
            name="eventUrl"
            label="Event URL (optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.eventUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            placeholder="https://example.com/event"
            helperText="Enter a valid URL for the event or leave empty"
            required={false}
          />
          <TextField
            margin="dense"
            name="organizer"
            label="Organizer Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newEventData.createdBy}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewEventDialog}>Cancel</Button>
          <Button
            onClick={handleSubmitNewEvent}
            variant="contained"
            color="primary"
            disabled={submitting}
          >
            {submitting ? <CircularProgress size={24} /> : 'Add Event'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
