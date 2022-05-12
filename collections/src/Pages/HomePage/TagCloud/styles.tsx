import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  tagCloud: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    '& span': {
      cursor: 'pointer',
    },
  },
}));
