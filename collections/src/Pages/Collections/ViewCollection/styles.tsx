import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      padding: '30px',
    },
  })
);
