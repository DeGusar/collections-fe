import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  navLink: {
    position: 'relative',
    color: `${theme.palette.text}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${theme.palette.secondary.main}`,
      '&::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },
  },
}));
