import { AppBar, Button, Toolbar, Typography, useMediaQuery } from '@mui/material';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { FormattedMessage } from 'react-intl';
import routes from '../../shared/constants/routes';
import { useStyles } from './styles';
import { BurgerMenu } from './Burgermenu/BurgerMenu';
import { DesktopNavMenu } from './DesktopNavMenu/DesktopNavMenu';

export function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const isMobile = useMediaQuery(state.theme.breakpoints.down('md'));

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
        <Typography
          variant="h5"
          onClick={() => navigate('/')}
          component="div"
          sx={{ flexGrow: 1, ml: 4, cursor: 'pointer' }}
        >
          UStore
        </Typography>
        {isMobile ? <BurgerMenu /> : <DesktopNavMenu />}
      </Toolbar>
    </AppBar>
  );
}
