// src/styles/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#56A3A6', // Verdigris - teal vibrant
      light: '#7BB8BB',
      dark: '#3D7275',
      contrastText: '#fff',
    },
    secondary: {
      main: '#CAD49D', // Sage - light green
      light: '#D8E0B4',
      dark: '#B5C285',
      contrastText: '#484538',
    },
    background: {
      default: '#FAFBFA', // White slightly green
      paper: '#ffffff',
    },
    text: {
      primary: '#484538', // Black Olive - Main text
      secondary: '#6B6B5A',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiSelect-select': {
            '&:focus': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: '300px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(86, 163, 166, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 3px 6px rgba(72, 69, 56, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(86, 163, 166, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiModal-root': {
            position: 'fixed !important',
          },
          '& .MuiBackdrop-root': {
            position: 'fixed !important',
          },
        },
        paper: {
          position: 'fixed',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          position: 'fixed',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarGutter: 'stable',
          overflowY: 'scroll',
        },
        body: {
          scrollbarWidth: 'thin',
          '&.MuiModal-root-open': {
            paddingRight: '0px !important',
          },
        },
      },
    },
  },
});

export default theme;
