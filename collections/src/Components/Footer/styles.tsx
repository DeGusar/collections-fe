import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  footerSection: {
    backgroundColor: 'black',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: '40px 0',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '15px',
    },
  },
  content: {
    fontWeight: '100',
    fontSize: '22px',
    lineHeight: '22px',
    color: 'white',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '18px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
  githubLogo: {
    width: '45px',
    height: '45px',
    background:
      'url("https://res.cloudinary.com/rss-collection/image/upload/v1652345776/github_ke79xc.svg")',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'all 0.5s',
    },
    [theme.breakpoints.down('sm')]: {
      width: '25px',
      height: '25px',
    },
  },
}));
