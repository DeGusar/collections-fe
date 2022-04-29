import { ButtonGroup, Divider, Button, Drawer, Typography, IconButton, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { FormattedMessage } from 'react-intl';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from 'react';
import { AppContext } from '../../app/context/AppContext';
import CloseIcon from '@mui/icons-material/Close';
import { lightTheme } from '../../app/themes/lightTheme';
import { darkTheme } from '../../app/themes/darkTheme';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import { locales } from '../../shared/constants/locales';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  selected: {
    color: theme.palette.primary.contrastText,
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: theme.palette.primary.dark,
    borderColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  button: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
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

export const DrawerSettings = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles(state.theme);
  return (
    <Drawer
      open={state.isDrawerSettings}
      anchor="right"
      onClose={() => dispatch({ type: 'setDrawerSettings', payload: false })}
    >
      <Box className={classes.boxTitle}>
        <Typography ml={1} p={2} variant="h6">
          <FormattedMessage id="drawer-settings-title" />
        </Typography>
        <IconButton onClick={() => dispatch({ type: 'setDrawerSettings', payload: false })}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />
      <Box className={classes.boxContent}>
        <Typography>
          <FormattedMessage id="drawer-settings-theme" />
        </Typography>

        <ButtonGroup size="large" sx={{ width: '100%', marginBottom: '10px' }}>
          <Button
            fullWidth
            className={state.theme === lightTheme ? classes.selected : ''}
            onClick={() => {
              dispatch({ type: 'setTheme', payload: lightTheme });
              localStorage.setItem(localStorageKeys.THEME, 'light');
            }}
            startIcon={<LightModeIcon />}
          >
            <FormattedMessage id="drawer-settings-light" />
          </Button>
          <Button
            className={state.theme === darkTheme ? classes.selected : ''}
            fullWidth
            onClick={() => {
              dispatch({ type: 'setTheme', payload: darkTheme });
              localStorage.setItem(localStorageKeys.THEME, 'dark');
            }}
            startIcon={<DarkModeIcon />}
          >
            <FormattedMessage id="drawer-settings-dark" />
          </Button>
        </ButtonGroup>
        <Typography>
          <FormattedMessage id="drawer-settings-language" />
        </Typography>
        <Box>
          <Button
            size="large"
            fullWidth
            variant="text"
            className={state.currentLocale === locales.EN ? classes.selected : classes.button}
            onClick={() => {
              dispatch({ type: 'setLocale', payload: locales.EN });
              localStorage.setItem(localStorageKeys.LOCALE, locales.EN);
            }}
          >
            English
          </Button>
          <Button
            size="large"
            fullWidth
            variant="text"
            className={state.currentLocale === locales.RU ? classes.selected : classes.button}
            onClick={() => {
              dispatch({ type: 'setLocale', payload: locales.RU });
              localStorage.setItem(localStorageKeys.LOCALE, locales.RU);
            }}
          >
            Русский
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
