// src/components/AddToGoogleCalendarButton.tsx
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
import { useState } from 'react';
import { type Event } from '../hooks/useFirestore';
import {
  addEventToGoogleCalendar,
  initializeGoogleApi,
} from '../services/googleCalendar';

interface AddToGoogleCalendarButtonProps {
  event: Event;
}

const AddToGoogleCalendarButton = ({
  event,
}: AddToGoogleCalendarButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCalendar = async () => {
    setLoading(true);
    setError(null);

    try {
      // Inicializa a API se ainda não foi inicializada
      await initializeGoogleApi();

      // Adiciona o evento ao calendário
      const eventUrl = await addEventToGoogleCalendar(event);

      // Abre o evento no Google Calendar em uma nova aba
      if (eventUrl) {
        window.open(eventUrl, '_blank');
      }

      setSuccess(true);
    } catch (err) {
      console.error('Failed to add event to Google Calendar:', err);
      setError('Failed to add event to Google Calendar. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        startIcon={
          loading ? <CircularProgress size={20} /> : <CalendarTodayIcon />
        }
        onClick={handleAddToCalendar}
        disabled={loading}
      >
        Add to Google Calendar
      </Button>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Event added to your Google Calendar!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddToGoogleCalendarButton;
