import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  collectionContainer: {
    display: 'flex',
    padding: '12px',
    cursor: 'pointer',
  },
  imgWrapper: {
    display: 'flex',
    alignContent: 'start',
    '& img': {
      width: '80px',
      height: '80px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      objectFit: 'cover',
    },
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: '12px',
    rowGap: '5px',
  },
  headerContent: {
    display: 'flex',
    columnGap: '5px',
    width: '100%',
  },
  headerTypeSearch: {
    display: 'inline-block',
    backgroundColor: '#b38749',
    borderRadius: '4px',
    border: '1px solid #710707',
    padding: '0 5px',
  },
  description: {
    fontSize: '13px',
    color: 'rgb(20, 20, 20)',
    width: '100%',
    wordWrap: 'break-word',
  },
  author: {
    position: 'relative',
    '&::after': {
      content: '&middot',
    },
  },
  footerContent: {
    display: 'flex',
    columnGap: '5px',
    color: 'rgb(140, 140, 140)',
    fontSize: '13px',
    fontWeight: '400',
  },
}));
