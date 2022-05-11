import { makeStyles } from '@mui/styles';
import { autocompleteClasses, Theme } from '@mui/material';
import { wrap } from 'module';

export const useStyles = makeStyles((theme: Theme) => ({
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
