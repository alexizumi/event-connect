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
import { useEvents, type Event } from '../../hooks/useFirestore';

export default function Events() {
  const { events, loading, error, getEvents, addEvent } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const eventsPerPage = 6;

  // New event dialog state
  const [openNewEventDialog, setOpenNewEventDialog] = useState(false);
  const [newEventData, setNewEventData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0], // Default to today
    description: '',
    imageUrl: '',
    createdBy: 'Current User', // Replace with actual user info
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Use useCallback to prevent unnecessary re-renders
  const fetchEvents = useCallback(() => {
    console.log('Fetching events...');
    getEvents();
  }, [getEvents]);

  // Only fetch events once when component mounts
  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once

  // Apply filters when events, searchTerm, or sortBy changes
  useEffect(() => {
    console.log('Filtering events...', events.length);

    // Apply filters and sorting
    let result = [...events];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply sorting
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

  // Pagination logic
  const pageCount = Math.ceil(filteredEvents.length / eventsPerPage);
  const displayedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage,
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // New event dialog handlers
  const handleOpenNewEventDialog = () => {
    setOpenNewEventDialog(true);
  };

  const handleCloseNewEventDialog = () => {
    setOpenNewEventDialog(false);
    // Reset form data
    setNewEventData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      imageUrl: '',
      createdBy: 'Current User', // Replace with actual user info
    });
    setSubmitError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitNewEvent = async () => {
    // Validate form data
    if (
      !newEventData.title ||
      !newEventData.date ||
      !newEventData.description
    ) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Call the addEvent function from useEvents hook
      await addEvent({
        title: newEventData.title,
        date: newEventData.date,
        description: newEventData.description,
        imageUrl: newEventData.imageUrl || undefined,
        createdBy: newEventData.createdBy,
      });

      // Close dialog and refresh events
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

  console.log('Rendering with events:', filteredEvents.length);

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
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenNewEventDialog}
        >
          Add New Event
        </Button>
      </Box>

      {/* Filters */}
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
                setPage(1); // Reset to first page on search
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
              >
                <MenuItem value="date">Event Date (newest first)</MenuItem>
                <MenuItem value="title">Title (A-Z)</MenuItem>
                <MenuItem value="recent">Recently Added</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Events Grid */}
      {displayedEvents.length === 0 ? (
        <Alert severity="info">No events found matching your criteria.</Alert>
      ) : (
        <>
          <Grid container spacing={3}>
            {displayedEvents.map((event, index) => {
              console.log(`Rendering event ${index}:`, event.id);
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
                    imageUrl={event.imageUrl || '/placeholder-event.jpg'}
                    description={event.description}
                  />
                </Grid>
              );
            })}
          </Grid>

          {/* Pagination */}
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

      {/* New Event Dialog */}
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
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
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
          />
          <TextField
            margin="dense"
            name="createdBy"
            label="Created By"
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
