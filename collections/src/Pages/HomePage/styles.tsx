import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  welcome: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'black',
  },
  wrapper: {
    minHeight: '100%',
  },
  content: {
    position: 'absolute',
    pointerEvents: 'none',
    left: '0',
    top: '50%',
    zIndex: '50',
    transform: 'translateY(-50%)',
    '@media (max-width:900px)': {
      position: 'relative',
      transform: 'none',
      left: 'none',
      top: 'none',
      margin: '20px',
    },
  },
  containerWelcome: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'end',
  },
  welcomeHeader: {
    '@media (max-width:900px)': {
      textAlign: 'center',
    },
  },
  welcomeContent: {
    marginTop: '20px',
    color: 'white',
    '@media (max-width:900px)': {
      textAlign: 'center',
    },
  },
  swiperContainer: {
    cursor: 'grab',
    position: 'relative',
    width: '100%',
    margin: '30px 0',
  },
  latest: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    minHeight: '100vh',
    paddingBottom: '75px',
  },
  latestTitle: {
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
    '@media (max-width:1200px)': {
      margin: '30px 0',
    },
    '@media (max-width:900px)': {
      margin: '20px 0',
    },
  },
  latestCardsContainer: {
    paddingTop: '70px',
    '@media (max-width:1200px)': {
      paddingTop: '40px',
    },
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
    '@media (max-width:1200px)': {
      lineHeight: '27px',
      fontSize: '25px',
    },
    '@media (max-width:900)': {
      lineHeight: '20px',
      fontSize: '20px',
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
    '@media (max-width:1200px)': {
      lineHeight: '20px',
      fontSize: '20px',
    },
    '@media (max-width:900)': {
      lineHeight: '16px',
      fontSize: '16px',
    },
  },
  cardDate: {
    paddingTop: '11px',
    fontWeight: '100',
    fontSize: '18px',
    lineHeight: '21px',
  },
  container: {
    minHeight: '100vh',
    height: '1px',
  },
  biggestCollections: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: '75px',
    paddingTop: '50px',
    backgroundColor: 'black',
  },
  biggestTitle: {
    position: 'relative',
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
  collectionBiggestCard: {
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      '& $cardBiggestTitle': {
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
  cardBiggestAuthor: {
    color: 'white',
    paddingTop: '21px',
    fontWeight: '100',
    fontSize: '22px',
    lineHeight: '26px',
  },
  cardBiggestItems: {
    color: 'white',
    fontWeight: '100',
    fontSize: '22px',
    lineHeight: '26px',
  },
  cardBiggestTitle: {
    color: 'white',
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
  cardBiggestDate: {
    color: 'white',
    paddingTop: '11px',
    fontWeight: '100',
    fontSize: '18px',
    lineHeight: '21px',
  },
  tagCloudsContainer: {
    width: '100%',
    minHeight: '100vh',
    paddingBottom: '75px',
    paddingTop: '50px',
    backgroundColor: theme.palette.background.default,
  },
  tagsContainer: {
    minHeight: '90%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  tagsCloudTitle: {
    position: 'relative',
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
}));
