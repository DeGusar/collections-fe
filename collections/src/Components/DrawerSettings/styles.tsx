import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.secondary.main}`,
    '&:hover': {
      color: theme.palette.secondary.dark,
    },
  },
  select: {
    color: theme.palette.primary.contrastText,
    borderRadius: '10px',
    borderWidth: '1px ',
    borderStyle: 'solid ',
    backgroundColor: `${theme.palette.secondary.main}`,
    borderColor: `${theme.palette.secondary.dark}`,
    '&:hover': {
      /* color: theme.palette.secondary.light, */
      backgroundColor: theme.palette.secondary.light,
    },
  },
  boxTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boxContent: {
    width: '300px',
    padding: '10px 20px',
  },
}));
