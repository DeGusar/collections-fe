import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Paper,
  InputBase,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
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
import CollectionsIcon from '@mui/icons-material/Collections';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export function Header() {
  const intl = useIntl();
  const classes = useStyles();
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const userId = localStorage.getItem(localStorageKeys.USER_ID);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const isMobile = useMediaQuery(state.theme.breakpoints.down('md'));
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);
    setAnchor(event.currentTarget);
  };
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
      setAnchor(null);
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
        <Typography
          variant="h5"
          onClick={() => navigate('/')}
          component="div"
          sx={{ flexGrow: 1, ml: 4, cursor: 'pointer' }}
        >
          UStore
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              className={classes.menuButton}
              edge="start"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchor}
              onClose={() => setAnchor(null)}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchor)}
            >
              <Paper className={classes.paperActive}>
                <InputBase
                  sx={{ ml: 1, flex: 1, zIndex: '999' }}
                  value={query}
                  onKeyUp={handleKeyUp}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={intl.formatMessage({ id: 'modal-search-search' })}
                />
                <IconButton
                  sx={{ p: '10px' }}
                  onClick={() => {
                    if (query) {
                      setAnchor(null);
                      navigate(`/search/${query}`);
                      setQuery('');
                    } else return;
                  }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Paper>

              <MenuItem
                className={classes.menu}
                onClick={() => setAnchor(null)}
                component={NavLink}
                to="/"
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Typography variant="h6">
                  <FormattedMessage id="header-home" />
                </Typography>
              </MenuItem>
              {state.isAuthorised && (
                <MenuItem
                  className={classes.menu}
                  onClick={() => setAnchor(null)}
                  component={NavLink}
                  to={`/collections/${userId}`}
                >
                  <ListItemIcon>
                    <CollectionsIcon />
                  </ListItemIcon>
                  <Typography variant="h6">
                    <FormattedMessage id="header-collections" />
                  </Typography>
                </MenuItem>
              )}
              {role === 'admin' && (
                <MenuItem
                  className={classes.menu}
                  onClick={() => setAnchor(null)}
                  component={NavLink}
                  to="/admin"
                >
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <Typography variant="h6">
                    <FormattedMessage id="header-admin" />
                  </Typography>
                </MenuItem>
              )}
              <MenuItem
                className={classes.menu}
                onClick={() => {
                  setAnchor(null);
                  dispatch({ type: 'setDrawerSettings', payload: true });
                }}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <Typography variant="h6">
                  <FormattedMessage id="drawer-settings-title" />
                </Typography>
              </MenuItem>
              {state.isAuthorised && (
                <MenuItem
                  className={classes.menu}
                  onClick={() => {
                    logout();
                    setAnchor(null);
                  }}
                >
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <Typography variant="h6">
                    <FormattedMessage id="header-logout" />
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}
