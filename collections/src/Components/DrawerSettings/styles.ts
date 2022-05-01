import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.primary.main}`,
  },
  select: {
    color: theme.palette.primary.contrastText,
    borderRadius: '10px',
    borderWidth: '1px ',
    borderStyle: 'solid ',
    backgroundColor: `${theme.palette.primary.dark}`,
    borderColor: `${theme.palette.secondary.main}`,
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: theme.palette.primary.light,
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
