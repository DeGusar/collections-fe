import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    h1: {
      fontSize: 80,
      fontWeight: 500,
      color: 'white',
    },
    h3: {
      fontSize: 28,
      fontWeight: 300,
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
