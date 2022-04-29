import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: blueGrey[500],
    },
  },
});
