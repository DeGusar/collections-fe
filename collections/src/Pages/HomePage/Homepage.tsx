import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../app/context/AppContext';
import { getLatestCollections } from '../../shared/api/collectionsApi';
import { getAllTags } from '../../shared/api/tagApi';
import { dateFormats } from '../../shared/constants/dataFormats';
import { CardCollectionType, TagType } from '../../types';
import { useStyles } from './styles';
import { SwiperImages } from './Swiper/Swiper';
import date from 'date-and-time';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';

export default function Homepage() {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const navigate = useNavigate();

  const [latestCollections, setLatestCollections] = useState([] as CardCollectionType[]);
  const [tags, setTags] = useState([] as TagType[]);

  useEffect(() => {
    const getCollections = async () => {
      const { data } = await getLatestCollections();
      console.log(data);
      setLatestCollections(data.collections);
    };
    getCollections();
  }, []);
  useEffect(() => {
    const getTags = async () => {
      const { data } = await getAllTags();
      console.log(data);
      setTags(data);
    };
    getTags();
  }, []);

  return (
    <>
      <Box className={classes.welcome}>
        <Container className={classes.wrapper} maxWidth="xl">
          <Grid container className={classes.containerWelcome}>
            <Grid item xs={12} md={6} xl={5} className={classes.content} sx={{ zIndex: '25' }}>
              <Box>
                <Typography variant="h1">Welcome to UStore</Typography>
                <Typography className={classes.welcomeContent} variant="h3">
                  UStore is an online social platform for collectors. Create collections, add items
                  and share with your friends
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={10} xl={9} className={classes.swiperContainer}>
              <SwiperImages />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.latest}>
        <Container maxWidth="xl">
          <Typography variant="h1" className={classes.latestTitle}>
            Latest Collections
          </Typography>
          <Grid container spacing={7} className={classes.latestCardsContainer}>
            {latestCollections.map((collection) => {
              return (
                <Grid
                  item
                  xs={6}
                  xl={4}
                  className={classes.collectionCard}
                  onClick={() =>
                    navigate(`${routes.COLLECTIONS_ROOT}/${collection.userId}/${collection._id}`)
                  }
                  key={collection.nameCollection}
                >
                  <img
                    src={collection.imageSrc}
                    alt="Collection image"
                    className={classes.cardImage}
                  ></img>
                  <Box>
                    <Typography className={classes.cardTitle}>
                      {collection.nameCollection}
                    </Typography>
                    <Typography className={classes.cardAuthor}>{collection.author}</Typography>
                    <Typography className={classes.cardDate}>
                      {date.format(new Date(collection.createdAt), `${dateFormats.TIME}`)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
