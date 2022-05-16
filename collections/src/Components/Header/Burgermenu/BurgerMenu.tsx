import {
  IconButton,
  InputBase,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CollectionsIcon from '@mui/icons-material/Collections';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from '../styles';
import localStorageKeys from '../../../shared/constants/localStorageKeys';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteUserFromLocalStorage } from '../../../shared/localStorageService/localStorageService';

export const BurgerMenu = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const classes = useStyles(state.theme);
  const intl = useIntl();
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const userId = localStorage.getItem(localStorageKeys.USER_ID);
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };
  const logout = () => {
    deleteUserFromLocalStorage();
    dispatch({ type: 'setIsLogin', payload: false });
    dispatch({ type: 'setName', payload: '' });
  };
  const [query, setQuery] = useState('');
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query) {
      navigate(`/search/${query}`);
      setQuery('');
      setAnchor(null);
    } else return;
  };

  return (
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
  );
};
