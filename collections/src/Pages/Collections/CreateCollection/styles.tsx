import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
    flexWrap: 'wrap',
    padding: '15px 0',
    backgroundColor: `${theme.palette.grey[200]}`,
  },
  fieldTitle: {
    width: '100%',
    textAlign: 'left',
    marginTop: '10px',
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
  buttonWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonSubmit: {
    width: '100%',
  },
}));
