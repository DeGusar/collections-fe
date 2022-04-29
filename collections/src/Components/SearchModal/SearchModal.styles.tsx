import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  box: {
    width: '100%',
    position: 'absolute',
    bottom: '0',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  paper: {
    padding: '2px 4px',
    marginBottom: '64px',
    display: 'flex',
    alignItems: 'center',
    width: '400px',
    border: `1px solid ${theme.palette.text.primary}`,
  },
}));
