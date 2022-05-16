import { Container, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { searchByQuery } from '../../shared/api/searchApi';
import { CollectionsResult } from './CollectionResult/CollectionsResult';
import { ItemsResult } from './ItemsResult/ItemsResult';
import { useStyles } from './styles';

export const Search = () => {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const { query } = useParams();
  const [itemsResult, setItemsResult] = useState([]);
  const [collectionsResult, setCollectionsResult] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const { data } = await searchByQuery(query as string);
      setItemsResult(data.items);
      setCollectionsResult(data.collections);
    };
    getSearchResult();
  }, [query]);

  return (
    <Container maxWidth="xl">
      <Typography sx={{ marginTop: '15px' }}>
        <FormattedMessage id="search-query" />
        {` ${query}`}
      </Typography>
      <Paper className={classes.resultsContainer}>
        <CollectionsResult collections={collectionsResult} />
        <ItemsResult items={itemsResult} />
      </Paper>
    </Container>
  );
};
