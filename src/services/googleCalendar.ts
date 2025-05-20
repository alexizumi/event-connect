// src/services/googleCalendar.ts
import { type Event } from '../hooks/useFirestore';

/// <reference types="gapi" />
/// <reference types="gapi.client" />

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!CLIENT_ID) {
  console.error(
    'VITE_GOOGLE_CLIENT_ID não está definido nas variáveis de ambiente',
  );
}

if (!API_KEY) {
  console.error(
    'VITE_GOOGLE_API_KEY não está definido nas variáveis de ambiente',
  );
}

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

let tokenClient: google.accounts.oauth2.TokenClient;
let gapiInited = false;
let gisInited = false;

export const initializeGoogleApi = async (): Promise<void> => {
  console.log('Inicializando Google API com CLIENT_ID:', CLIENT_ID);
  if (!gapiInited) {
    await new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        gapi.load('client', async () => {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [
              'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            ],
          });
          gapiInited = true;
          resolve();
        });
      };
      document.body.appendChild(script);
    });
  }

  if (!gisInited) {
    await new Promise<void>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = () => {
        if (!CLIENT_ID) {
          throw new Error(
            'CLIENT_ID não está definido. Verifique suas variáveis de ambiente.',
          );
        }

        tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: SCOPES.join(' '),
          callback: '',
        });
        gisInited = true;
        resolve();
      };
      document.body.appendChild(script);
    });
  }
};

export const authorizeCalendarApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('Token client not initialized'));
      return;
    }

    tokenClient.callback = (resp) => {
      if (resp.error) {
        reject(resp);
      } else {
        resolve();
      }
    };

    if (gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
};

export const addEventToGoogleCalendar = async (
  event: Event,
): Promise<string> => {
  try {
    if (!gapi.client.getToken()) {
      await authorizeCalendarApi();
    }

    const calendarEvent = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: new Date(event.date).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(
          new Date(event.date).getTime() + 3600000,
        ).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    await gapi.client.load('calendar', 'v3');

    const response = await (gapi.client as any).calendar.events.insert({
      calendarId: 'primary',
      resource: calendarEvent,
    });

    return response.result.htmlLink;
  } catch (error) {
    console.error('Error adding event to Google Calendar:', error);
    throw error;
  }
};

declare global {
  interface Window {
    gapi: typeof gapi;
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: any) => google.accounts.oauth2.TokenClient;
        };
      };
    };
  }

  namespace google.accounts.oauth2 {
    interface TokenClient {
      callback: (response: any) => void;
      requestAccessToken: (options: { prompt: string }) => void;
    }
  }
}
