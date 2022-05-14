import { Container, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { getByTags } from '../../shared/api/searchApi';
import { ItemsResult } from '../Search/ItemsResult/ItemsResult';
import { useStyles } from './styles';

export const SearchByTag = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const { tag } = useParams();
  const [itemsResult, setItemsResult] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const { data } = await getByTags(tag as string);
      setItemsResult(data);
    };
    getItems();
  }, [tag]);
  return (
    <Container maxWidth="xl">
      <Typography sx={{ marginTop: '15px' }}>
        <FormattedMessage id="search-tag" />
        {` ${tag}`}
      </Typography>
      <Paper className={classes.resultsContainer}>
        <ItemsResult items={itemsResult} />
      </Paper>
    </Container>
  );
};
