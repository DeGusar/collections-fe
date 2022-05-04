import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      minHeight: 'calc(100vh - 64px)',
      padding: '30px',
      alignItems: 'start',
      justifyContent: 'start',
      gap: '20px',
      flexShrink: '0',
      flexWrap: 'wrap',
      backgroundColor: `${theme.palette.grey[200]}`,
    },
    buttonWrap: {
      display: 'flex',
      width: '100%',
      alignSelf: 'end',
      justifyContent: 'end',
    },
    buttonAdd: {},
  })
);
