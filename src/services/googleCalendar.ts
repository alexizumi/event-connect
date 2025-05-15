// src/services/googleCalendar.ts
// src/services/googleCalendar.ts
import type { Event } from '../hooks/useFirestore';

export const addToGoogleCalendar = (event: Event) => {
  // Format the event data for Google Calendar
  const startDate = new Date(event.date);
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 2); // Assuming 2-hour events

  // Create Google Calendar URL with event parameters
  const googleCalendarUrl = new URL(
    'https://calendar.google.com/calendar/render',
  );
  googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
  googleCalendarUrl.searchParams.append('text', event.title);
  googleCalendarUrl.searchParams.append('details', event.description);
  googleCalendarUrl.searchParams.append(
    'dates',
    `${formatDate(startDate)}/${formatDate(endDate)}`,
  );

  // Open the Google Calendar link in a new tab
  window.open(googleCalendarUrl.toString(), '_blank');
};

// Helper function to format date for Google Calendar
const formatDate = (date: Date): string => {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
};
