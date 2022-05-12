import { Box, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../app/context/AppContext';
import { useStyles } from './styles';

export const Footer = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  return (
    <Box className={classes.footerSection}>
      <Container maxWidth="xl" className={classes.footer}>
        <a
          href="https://github.com/DeGusar"
          target="_blank"
          rel="noreferrer"
          className={classes.githubLogo}
        ></a>
        <Typography className={classes.content}>Itransition software development course</Typography>
        <Typography className={classes.content}>2022</Typography>
      </Container>
    </Box>
  );
};
