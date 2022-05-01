import { AppBar, Button, Toolbar, Typography, Box, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage } from 'react-intl';
import routes from '../../shared/constants/routes';
import { deleteUserFromLocalStorage } from '../../shared/localStorageService/localStorageService';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './styles';

export function Header() {
  const classes = useStyles();
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const logout = () => {
    deleteUserFromLocalStorage();
    dispatch({ type: 'setIsLogin', payload: false });
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {state.isAuthorised ? (
          <>
            <Button variant="outlined" sx={{ ml: 5 }} onClick={logout} color="inherit">
              <FormattedMessage id="header-logout" />
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            sx={{ ml: 5 }}
            color="inherit"
            onClick={() => navigate(routes.AUTHORISATION)}
          >
            <FormattedMessage id="header-login" />
          </Button>
        )}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: 4 }}>
          UStore.
        </Typography>
        <Box className={classes.headerNav}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : `${classes.navLink}`
            }
            to="/"
          >
            <FormattedMessage id="header-home" />
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${classes.navLink} ${classes.active}` : `${classes.navLink}`
            }
            to="/collections"
          >
            <FormattedMessage id="header-collections" />
          </NavLink>
          {role === 'admin' && (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.active}` : `${classes.navLink}`
              }
              to="/admin"
            >
              <FormattedMessage id="header-admin" />
            </NavLink>
          )}
        </Box>
        <Box ml={4}>
          <IconButton onClick={() => dispatch({ type: 'setModalSearch' })}>
            {!state.isModalSearch ? (
              <SearchIcon sx={{ color: 'white' }} />
            ) : (
              <CloseIcon sx={{ color: 'white' }} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({ type: 'setDrawerSettings', payload: true });
              console.log('yes');
            }}
          >
            <SettingsIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
