import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import date from 'date-and-time';

export const useStyles = makeStyles((theme: Theme) => ({
  welcome: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    backgroundColor: 'black',
  },
  wrapper: {
    height: '100%',
    maxHeight: 'calc(100vh - 64px)',
  },
  content: {
    position: 'absolute',
    pointerEvents: 'none',
    left: '0',
    top: '50%',
    zIndex: '50',
    transform: 'translateY(-50%)',
  },
  containerWelcome: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'end',
  },
  welcomeContent: {
    marginTop: '20px',
    color: 'white',
  },
  swiperContainer: {
    cursor: 'grab',
    position: 'relative',
    right: '0',
    bottom: '0',
    top: '0',
    width: '100%',
  },
  latest: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHheight: '100vh',
    paddingBottom: '75px',
  },
  latestTitle: {
    color: theme.palette.text.secondary,
    position: 'relative',
    margin: '50px 0',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-27px',
      left: '0',
      width: '100%',
      height: '3px',
      backgroundColor: '#710707',
    },
  },
  latestCardsContainer: {
    paddingTop: '70px',
  },
  collectionCard: {
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      '& $cardTitle': {
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: '0',
          height: '2px',
          backgroundColor: '#710707',
          width: '100%',
          transition: 'all 0.5s ease-out',
        },
      },
    },
  },
  cardTitle: {
    paddingTop: '20px',
    position: 'relative',
    lineHeight: '35px',
    fontSize: '32px',
    textTransform: 'uppercase',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-10px',
      left: '0',
      height: '2px',
      backgroundColor: '#710707',
      width: '70%',
      transition: 'all 0.5s ease-out',
    },
  },
  cardImage: {
    width: '100%',
    height: '285px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    objectFit: 'cover',
  },
  cardAuthor: {
    paddingTop: '21px',
    fontWeight: '100',
    fontSize: '22px',
    lineHeight: '26px',
  },
  cardDate: {
    paddingTop: '11px',
    fontWeight: '100',
    fontSize: '18px',
    lineHeight: '21px',
  },
}));
