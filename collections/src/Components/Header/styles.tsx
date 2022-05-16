import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.common.black,
  },
  headerNav: {
    display: 'flex',
    columnGap: '30px',
    ml: 2,
    '@media (max-width:1200px)': {
      columnGap: '10px',
    },
  },
  navLink: {
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      color: `#b38749`,
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
      background: `#b38749`,
      transform: 'scaleX(0)',
      transformOrigin: 'right',
      transition: 'transform 1s',
    },
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${theme.palette.text.primary}`,
    opacity: '0',
    pointerEvents: 'none',
    width: '0',
    transition: 'all 1s',
  },
  paperActive: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '400px',
    marginLeft: '40px',
    border: `1px solid ${theme.palette.text.primary}`,
    opacity: '1',
    transition: 'all 1s',
    '@media (max-width:1200px)': {
      margin: '10px',
      width: '300px',
    },
  },
  active: {
    color: `#b38749`,
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '110%',
      left: '-10%',
      width: '120%',
      height: '2px',
      background: `#b38749`,
      transform: 'scaleX(1)',
      transformOrigin: 'right',
      transition: 'transform 1s',
      zIndex: '100',
    },
  },
  button: {
    color: 'white',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all 0.5s',
      color: '#b38749',
    },
  },
  controls: {
    marginLeft: '30px',
    '@media (max-width:1200px)': {
      marginLeft: '10px',
    },
  },
  menuButton: {
    color: 'white',
  },
  menu: {
    width: '300px',
  },
}));
