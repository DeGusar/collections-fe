import React, { useContext, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../app/context/AppContext';
import { deleteUserFromLocalStorage } from '../../../shared/localStorageService/localStorageService';
import { useStyles } from '../styles';
import localStorageKeys from '../../../shared/constants/localStorageKeys';
import { Box, IconButton, InputBase, Paper } from '@mui/material';

export const DesktopNavMenu = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const [isSearchBar, setIsSearchBar] = useState(false);
  const [query, setQuery] = useState('');
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const userId = localStorage.getItem(localStorageKeys.USER_ID);
  const intl = useIntl();
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
    <>
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
    </>
  );
};
