import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  typography: {
    h1: {
      fontSize: 80,
      fontWeight: 500,
    },
    h2: {
      fontSize: 80,
      fontWeight: 500,
    },
    h3: {
      fontSize: 28,
      fontWeight: 300,
    },
  },
  palette: {
    mode: 'dark',
    secondary: {
      main: blueGrey[500],
    },
  },
});
