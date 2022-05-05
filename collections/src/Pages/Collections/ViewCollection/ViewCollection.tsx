import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { BreadCrumps } from './BreadCrumps/BreadCrumps';
import { useStyles } from './styles';
import { Container } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { useParams } from 'react-router-dom';

export const ViewCollection = () => {
  const { state } = useContext(AppContext);

  const classes = useStyles(state.theme);
  const { _id } = useParams();

  return (
    <Container className={classes.container} maxWidth="xl">
      <BreadCrumps />
    </Container>
  );
};
