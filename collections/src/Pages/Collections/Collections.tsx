import { Fab, Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { CardCollection } from './CardCollection/CardCollection';
import { getCollectionsByIdUser } from '../../shared/api/collectionsApi';
import { CardCollectionType } from '../../types';
import { Masonry } from '@mui/lab';
import date from 'date-and-time';
import { dateFormats } from '../../shared/constants/dataFormats';

export default function Collections() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    state: { theme },
  } = useContext(AppContext);
  const [collections, setCollections] = useState([] as CardCollectionType[]);
  const classes = useStyles(theme);

  useEffect(() => {
    const getCard = async () => {
      const { data } = await getCollectionsByIdUser(userId as string);
      setCollections(data);
    };
    getCard();
  }, [userId]);

  return (
    <Container className={classes.container} maxWidth="xl">
      <Masonry sx={{ margin: '0', alignContent: 'start' }} columns={4} spacing={2}>
        {collections.length > 0 &&
          collections.map((collection: CardCollectionType) => {
            const dateParams = new Date(collection.createdAt);
            const created = date.format(dateParams, dateFormats.DATE);
            return (
              <CardCollection
                {...collection}
                userId={userId}
                createdAt={created}
                key={collection._id}
              />
            );
          })}
      </Masonry>
      <Box className={classes.buttonWrap}>
        <Fab
          color="secondary"
          className={classes.buttonAdd}
          onClick={() => navigate(`${routes.COLLECTIONS_ROOT}/${userId}/create`)}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
}
