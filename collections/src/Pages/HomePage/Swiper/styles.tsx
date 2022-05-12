import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  swiper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    overflow: 'hidden',
    '& img': {
      height: 'auto !important',
      width: '100% !important',
      maxHeight: 'calc(100vh - 64px)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '30',
      pointerEvents: 'none',
      background:
        'linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.5) 16.19%, rgba(0, 0, 0, 0) 30.73%)',
    },
  },
}));
