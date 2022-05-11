import { createTheme } from '@mui/material/styles';
import { teal, cyan, amber } from '@mui/material/colors';
import { palette } from '@mui/system';
import { ThemeContext } from '@emotion/react';

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
      main: teal[500],
    },
    secondary: {
      main: cyan[500],
    },
    text: {
      secondary: '#9d8665',
    },
  },
});
