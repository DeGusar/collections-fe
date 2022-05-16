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
import { TagsCloud } from './TagCloud/TagCloud';
import { Footer } from '../../Components/Footer/Footer';
import { ButtonToTop } from './ButtonToTop/ButtonToTop';
import { Triangle } from 'react-loader-spinner';

export default function Homepage() {
  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const navigate = useNavigate();

  const [latestCollections, setLatestCollections] = useState([] as CardCollectionType[]);
  const [biggestCollections, setBiggestCollections] = useState([] as CardCollectionType[]);
  const [tags, setTags] = useState([] as TagType[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollections = async () => {
      const { data } = await getLatestCollections();
      setLatestCollections(data.collectionsNew);
      setBiggestCollections(data.collectionsBiggest);
    };
    getCollections();
  }, []);
  useEffect(() => {
    const getTags = async () => {
      const { data } = await getAllTags();
      const tags = data.map((tag: TagType) => ({
        value: tag.value,
        count: Math.floor(Math.random() * 20 + 11),
        items: tag.items,
      }));
      setTags(tags);
    };
    getTags();
  }, []);

  const handleClickOnTag = (tag: TagType) => {
    navigate(`${routes.SEARCH_ROOT}/tags/${tag.value}`);
  };

  return (
    <>
      {loading && (
        <Box className={classes.loader}>
          <Triangle height="100" width="100" color="grey" ariaLabel="loading" />
        </Box>
      )}
      <Box className={loading ? classes.hidden : classes.welcome}>
        <Container className={classes.wrapper} maxWidth="xl">
          <Grid container className={classes.containerWelcome}>
            <Grid item xs={12} md={6} xl={5} className={classes.content} sx={{ zIndex: '25' }}>
              <Box>
                <Typography className={classes.welcomeHeader} variant="h1">
                  Welcome to UStore
                </Typography>
                <Typography className={classes.welcomeContent} variant="h3">
                  UStore is an online social platform for collectors. Create collections, add items
                  and share with your friends
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={10} xl={9} className={classes.swiperContainer}>
              <SwiperImages
                handleLoad={() => {
                  setTimeout(() => setLoading(false), 1000);
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className={classes.latest}>
        <Container maxWidth="xl">
          <Typography variant="h2" className={classes.latestTitle}>
            Latest Collections
          </Typography>
          <Grid
            container
            spacing={{ xs: 1, md: 3, xl: 7 }}
            className={classes.latestCardsContainer}
          >
            {latestCollections.map((collection) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
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
      <Box className={classes.biggestCollections}>
        <Container maxWidth="xl">
          <Typography variant="h1" className={classes.biggestTitle}>
            Biggest collections
          </Typography>
          <Grid
            container
            spacing={{ xs: 1, md: 3, xl: 7 }}
            className={classes.latestCardsContainer}
          >
            {biggestCollections.map((collection) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={4}
                  className={classes.collectionBiggestCard}
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
                    <Typography className={classes.cardBiggestTitle}>
                      {collection.nameCollection}
                    </Typography>
                    <Typography className={classes.cardBiggestAuthor}>
                      {collection.author}
                    </Typography>
                    <Typography className={classes.cardBiggestItems}>
                      Items: {collection.items}
                    </Typography>
                    <Typography className={classes.cardBiggestDate}>
                      {date.format(new Date(collection.createdAt), `${dateFormats.TIME}`)}
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Box className={classes.tagCloudsContainer}>
        <Container maxWidth="xl" className={classes.container}>
          <Typography variant="h2" className={classes.tagsCloudTitle}>
            Tags Cloud
          </Typography>
          <Grid container className={classes.tagsContainer}>
            <Grid item xs={12} xl={8}>
              <TagsCloud tags={tags} handleClick={(tag) => handleClickOnTag(tag)} />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
      <ButtonToTop />
    </>
  );
}
