import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Paper,
  InputBase,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage, useIntl } from 'react-intl';
import routes from '../../shared/constants/routes';
import { deleteUserFromLocalStorage } from '../../shared/localStorageService/localStorageService';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './styles';
import LogoutIcon from '@mui/icons-material/Logout';

export function Header() {
  const intl = useIntl();
  const classes = useStyles();
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const userId = localStorage.getItem(localStorageKeys.USER_ID);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [query, setQuery] = useState('');
  const logout = () => {
    deleteUserFromLocalStorage();
    dispatch({ type: 'setIsLogin', payload: false });
    dispatch({ type: 'setName', payload: '' });
  };
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query) {
      navigate(`/search/${query}`);
      setQuery('');
      setIsSearchBar(false);
    } else return;
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {!state.isAuthorised && (
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
          UStore
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
          {state.isAuthorised && (
            <NavLink
              className={({ isActive }) =>
                isActive ? `${classes.navLink} ${classes.active}` : `${classes.navLink}`
              }
              to={`/collections/${userId}`}
            >
              <FormattedMessage id="header-collections" />
            </NavLink>
          )}
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
        <Paper className={isSearchBar ? classes.paperActive : classes.paper}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={query}
            onKeyUp={handleKeyUp}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={intl.formatMessage({ id: 'modal-search-search' })}
          />
          <IconButton
            sx={{ p: '10px' }}
            onClick={() => {
              if (query) {
                navigate(`/search/${query}`);
                setQuery('');
                setIsSearchBar(false);
              } else return;
            }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <Box className={classes.controls}>
          <IconButton
            onClick={() => {
              setIsSearchBar((prev) => !prev);
            }}
          >
            {!isSearchBar ? (
              <SearchIcon className={classes.button} />
            ) : (
              <CloseIcon className={classes.button} />
            )}
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({ type: 'setDrawerSettings', payload: true });
            }}
          >
            <SettingsIcon className={classes.button} />
          </IconButton>
          {state.isAuthorised && (
            <IconButton onClick={logout}>
              <LogoutIcon className={classes.button} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
