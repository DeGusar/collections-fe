import { createTheme } from '@mui/material/styles';
import { teal, cyan } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: cyan[500],
    },
  },
});
