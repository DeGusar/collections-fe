import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: 80,
      fontWeight: 500,
      color: 'white',
      '@media (max-width:1200px)': {
        fontSize: 50,
      },
      '@media (max-width:900px)': {
        fontSize: 40,
      },
    },
    h2: {
      fontSize: 80,
      fontWeight: 500,
      color: '#9d8665',
      '@media (max-width:1200px)': {
        fontSize: 50,
      },
      '@media (max-width:900px)': {
        fontSize: 40,
      },
    },
    h3: {
      fontSize: 28,
      fontWeight: 300,
      '@media (max-width:1200px)': {
        fontSize: 20,
      },
    },
  },
  palette: {
    primary: {
      main: '#b38749',
    },
    secondary: {
      main: '#710707',
    },
  },
});
