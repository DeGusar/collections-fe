import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  headerNav: {
    display: 'flex',
    columnGap: '30px',
    ml: 2,
  },
  navLink: {
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: `${theme.palette.secondary.main}`,
      '&::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
      },
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '110%',
      left: '-10%',
      width: '120%',
      height: '2px',
      background: `${theme.palette.secondary.main}`,
      transform: 'scaleX(0)',
      transformOrigin: 'right',
      transition: 'transform 1s',
    },
  },
  active: {
    color: `${theme.palette.secondary.main}`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '110%',
      left: '-10%',
      width: '120%',
      height: '2px',
      background: `${theme.palette.secondary.main}`,
      transform: 'scaleX(1)',
      transformOrigin: 'right',
      transition: 'transform 1s',
      zIndex: '100',
    },
  },
}));