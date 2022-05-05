import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      padding: '15px 0',
      backgroundColor: `${theme.palette.grey[300]}`,
    },
  })
);
