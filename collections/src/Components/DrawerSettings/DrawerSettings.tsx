import { ButtonGroup, Divider, Button, Drawer, Typography, IconButton } from '@mui/material';
import { Box } from '@mui/material';
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
import { useStyles } from './styles';

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
            color="inherit"
            onClick={() => {
              dispatch({ type: 'setTheme', payload: lightTheme });
              localStorage.setItem(localStorageKeys.THEME, 'light');
            }}
            startIcon={<LightModeIcon />}
            className={state.theme === lightTheme ? classes.select : ''}
          >
            <FormattedMessage id="drawer-settings-light" />
          </Button>
          <Button
            fullWidth
            color="inherit"
            onClick={() => {
              dispatch({ type: 'setTheme', payload: darkTheme });
              localStorage.setItem(localStorageKeys.THEME, 'dark');
            }}
            startIcon={<DarkModeIcon />}
            className={state.theme === darkTheme ? classes.select : ''}
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
            color="inherit"
            variant="text"
            className={state.currentLocale === locales.EN ? classes.select : classes.button}
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
            color="inherit"
            variant="text"
            className={state.currentLocale === locales.RU ? classes.select : classes.button}
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
