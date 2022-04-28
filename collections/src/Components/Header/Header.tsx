import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage } from 'react-intl';
import LocalePicker from '../LocalePicker/LocalePicker';
import routes from '../../shared/constants/routes';

export function Header() {
  const navigate = useNavigate();
  const {
    state: { isAuthorised },
  } = useContext(AppContext);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, ml: 4 }}>
            UStore.
          </Typography>
          <LocalePicker />
          {isAuthorised ? (
            <>
              <Button variant="outlined" sx={{ ml: 5 }} color="inherit">
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
            <NavLink to="/admin">
              <FormattedMessage id="header-admin" />
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
