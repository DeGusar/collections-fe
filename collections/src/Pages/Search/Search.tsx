import { Container, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { searchByQuery } from '../../shared/api/searchApi';
import { useStyles } from './styles';

export const Search = () => {
  const { state } = useContext(AppContext);
  const clases = useStyles(state.theme);
  const { query } = useParams();
  const [itemsResult, setItemsResult] = useState([]);
  const [collectionsResult, setCollectionsResult] = useState([]);

  useEffect(() => {
    const getSearchResult = async () => {
      const { data } = await searchByQuery(query as string);
      setItemsResult(data.items);
      setCollectionsResult(data.collections);
      console.log(data.items, data.collections);
    };
    getSearchResult();
  }, [query]);

  return (
    <Container maxWidth="xl">
      <Typography>
        <FormattedMessage id="search-query" />
        {` ${query}`}
      </Typography>
    </Container>
  );
};
