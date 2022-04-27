import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage } from 'react-intl';
import LocalePicker from '../LocalePicker/LocalePicker';

export function Header() {
  const navigate = useNavigate();
  const {
    state: { isAuthorised },
  } = useContext(AppContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <LocalePicker />
          {isAuthorised ? (
            <>
              <Button variant="outlined" sx={{ ml: 5 }} color="inherit">
                <FormattedMessage id="header-logout" />
              </Button>
              <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1, ml: 4 }}>
                UStore.
              </Typography>
            </>
          ) : (
            <Button
              variant="outlined"
              sx={{ ml: 5 }}
              color="inherit"
              onClick={() => navigate('/authorisation')}
            >
              <FormattedMessage id="header-login" />
            </Button>
          )}
          <div>
            <NavLink to="/">
              <FormattedMessage id="header-home" />
            </NavLink>
            <NavLink to="/collections">
              <FormattedMessage id="header-collections" />
            </NavLink>
            <NavLink to="/admin">
              <FormattedMessage id="header-admin" />
            </NavLink>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
