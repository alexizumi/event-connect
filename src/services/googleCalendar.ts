// src/services/googleCalendar.ts
import { type Event } from '../hooks/useFirestore';

/// <reference types="gapi" />
/// <reference types="gapi.client" />

// Cliente ID da sua aplicação OAuth
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Verificação de variáveis de ambiente
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

// Array de escopos de autorização necessários
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

let tokenClient: google.accounts.oauth2.TokenClient;
let gapiInited = false;
let gisInited = false;

/**
 * Inicializa a API do Google
 */
export const initializeGoogleApi = async (): Promise<void> => {
  console.log('Inicializando Google API com CLIENT_ID:', CLIENT_ID);
  // Carrega o cliente gapi
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

  // Carrega o cliente de identidade do Google
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
          callback: '', // Definido depois
        });
        gisInited = true;
        resolve();
      };
      document.body.appendChild(script);
    });
  }
};

/**
 * Autentica o usuário e obtém autorização para usar a API
 */
export const authorizeCalendarApi = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('Token client not initialized'));
      return;
    }

    // Configura o callback para o cliente de token
    tokenClient.callback = (resp) => {
      if (resp.error) {
        reject(resp);
      } else {
        resolve();
      }
    };

    // Solicita um token de acesso
    if (gapi.client.getToken() === null) {
      // Solicita um token de acesso
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Já tem um token
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
};

/**
 * Adiciona um evento ao Google Calendar do usuário
 */
export const addEventToGoogleCalendar = async (
  event: Event,
): Promise<string> => {
  try {
    // Certifique-se de que o usuário está autenticado
    if (!gapi.client.getToken()) {
      await authorizeCalendarApi();
    }

    // Cria o evento no formato do Google Calendar
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
        ).toISOString(), // Adiciona 1 hora como padrão
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    // Carrega explicitamente a API do Calendar antes de usá-la
    await gapi.client.load('calendar', 'v3');

    // Insere o evento no calendário do usuário
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

// Adicione tipos para o GAPI e Google Identity Services
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
