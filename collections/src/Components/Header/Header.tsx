import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const headerLinks = [
  { text: 'Home', link: '/' },
  { text: 'collections', link: '/collections' },
  { text: 'admin panel', link: '/admin' },
];

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
          {headerLinks.map((item) => (
            <NavLink to={item.link} key={item.text}>
              {item.text}
            </NavLink>
          ))}
        </div>
      </Toolbar>
    </AppBar>
  );
}
