import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  backToTop: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60px',
    height: '60px',
    position: 'fixed',
    borderRadius: '50%',
    zIndex: '10',
    top: '50px',
    right: '50px',
    opacity: '0',
    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 15%)',
    pointerEvents: 'none',
    transition: '2s',
  },
  backToTopShow: {
    opacity: '1',
    transition: '2s',
    cursor: 'pointer',
    pointerEvents: 'all',
  },
  arrowTop: {
    width: '25px',
    height: '25px',
    backgroundImage:
      'url(https://res.cloudinary.com/rss-collection/image/upload/v1652349547/button__top_as1x1y.svg)',
    backgroundSize: '100% 100%',
    pointerEvents: 'none',
  },
}));
