import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage } from 'react-intl';
import LocalePicker from '../LocalePicker/LocalePicker';
import routes from '../../shared/constants/routes';
import { deleteUserFromLocalStorage } from '../../shared/localStorageService/localStorageService';
import localStorageKeys from '../../shared/constants/localStorageKeys';

export function Header() {
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const logout = () => {
    deleteUserFromLocalStorage();
    dispatch({ type: 'setIsLogin', payload: false });
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: 4 }}>
            UStore.
          </Typography>
          <LocalePicker />
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
          <Box sx={{ display: 'flex', columnGap: '20px', ml: 2 }}>
            <NavLink to="/">
              <FormattedMessage id="header-home" />
            </NavLink>
            <NavLink to="/collections">
              <FormattedMessage id="header-collections" />
            </NavLink>
            {role === 'admin' && (
              <NavLink to="/admin">
                <FormattedMessage id="header-admin" />
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
