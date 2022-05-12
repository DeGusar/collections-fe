import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  footerSection: {
    backgroundColor: 'black',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: '40px 0',
  },
  content: {
    fontWeight: '100',
    fontSize: '22px',
    lineHeight: '22px',
    color: 'white',
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
  },
}));
