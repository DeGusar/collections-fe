import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    columnGap: '10px',
  },
  paper: { width: '100%' },
  listItem: {
    display: 'flex',
    justifyContent: 'start',
    columnGap: '10px',
    flexWrap: 'wrap',
    rowGap: '5px',
  },
  containerField: {
    display: 'flex',
    columnGap: '10px',
    width: '100%',
    justifyContent: 'start',
    alignItems: 'start',
    marginBottom: '20px',
  },
  select: {
    width: '150px',
  },
  input: {
    flexGrow: '1',
  },
  buttonWrapper: {
    display: 'flex',
    height: '56px',
    justifyContent: 'start',
    alignItems: 'center',
  },
}));
