import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: 80,
      fontWeight: 500,
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
    mode: 'dark',
    secondary: {
      main: blueGrey[500],
    },
  },
});
