import React, { useContext } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { BreadCrumps } from './BreadCrumps/BreadCrumps';
import { useStyles } from './styles';
import { Container } from '@mui/material';

export const ViewCollection = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);

  return (
    <Container className={classes.container} maxWidth="xl">
      <BreadCrumps />
    </Container>
  );
};
