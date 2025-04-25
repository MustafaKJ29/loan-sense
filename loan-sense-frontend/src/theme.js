import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    error: {
      main: '#dc3545',
      light: '#e35d6a',
      dark: '#b02a37'
    },
    warning: {
      main: '#ffc107',
      light: '#ffcd39',
      dark: '#d39e00'
    },
    success: {
      main: '#28a745',
      light: '#48c767',
      dark: '#1b8b33'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#343a40',
      secondary: '#6c757d'
    }
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#343a40',
      marginBottom: '1.5rem'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#343a40',
      marginBottom: '1.25rem'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      color: '#343a40',
      marginBottom: '1rem'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#343a40',
      marginBottom: '1rem'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#343a40',
      marginBottom: '0.75rem'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#343a40',
      marginBottom: '0.5rem'
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#6c757d',
      marginBottom: '0.5rem'
    },
    body1: {
      fontSize: '1rem',
      color: '#343a40'
    },
    body2: {
      fontSize: '0.875rem',
      color: '#6c757d'
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: '#1976d2'
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 2px rgba(25,118,210,0.2)'
            }
          }
        }
      }
    }
  }
});

export default theme; 