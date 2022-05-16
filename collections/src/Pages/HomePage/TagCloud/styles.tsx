import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  tagCloud: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    flexWrap: 'wrap',
    '& span': {
      cursor: 'pointer',
    },
  },
}));
