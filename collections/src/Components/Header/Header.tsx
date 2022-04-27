import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FormattedMessage } from 'react-intl';

export function Header() {
  const {
    state: { isAuthorised },
  } = useContext(AppContext);
  return (
    <AppBar position="static">
      <Toolbar>
        {isAuthorised ? (
          <>
            <Button variant="outlined" sx={{ ml: 5 }} color="inherit">
              Logout
            </Button>
            <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 4 }}>
              UStore.
            </Typography>
          </>
        ) : (
          <Button variant="outlined" sx={{ ml: 5 }} color="inherit">
            Login
          </Button>
        )}
        <div>
          <NavLink to="/">
            <FormattedMessage id="header-home" />
          </NavLink>
          <NavLink to="/collections">
            <FormattedMessage id="header-login" />
          </NavLink>
          <NavLink to="/admin">
            <FormattedMessage id="header-admin" />
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}
