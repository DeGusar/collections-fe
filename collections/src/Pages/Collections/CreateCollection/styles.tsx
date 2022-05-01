import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
    padding: '30px',
  },
  paper: {
    display: 'flex',
    rowGap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  upload: {
    flexGrow: '1 ! important',
  },
}));
