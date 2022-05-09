import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: '15px',
    width: '550px',
  },
}));
