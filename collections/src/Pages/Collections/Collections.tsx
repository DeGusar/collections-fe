/* eslint-disable react-hooks/exhaustive-deps */
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
import { SnackCreate } from './CreateCollection/Snack/Snack';

export default function Collections() {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    state: { theme },
  } = useContext(AppContext);
  const [collections, setCollections] = useState([] as CardCollectionType[]);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const classes = useStyles(theme);

  const getCollections = async () => {
    const { data } = await getCollectionsByIdUser(userId as string);
    setCollections(data);
  };

  useEffect(() => {
    getCollections();
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
                sendRequest={() => {
                  getCollections();
                  setIsOpenSnack(true);
                }}
                {...collection}
                userId={userId}
                createdAt={created}
                key={collection._id}
              />
            );
          })}
      </Masonry>
      {state.isAuthorised && (
        <Box className={classes.buttonWrap}>
          <Fab
            color="secondary"
            className={classes.buttonAdd}
            onClick={() => navigate(`${routes.COLLECTIONS_ROOT}/${userId}/create`)}
          >
            <AddIcon />
          </Fab>
        </Box>
      )}
      <SnackCreate
        message="card-collection-snack-deleted"
        isOpen={isOpenSnack}
        handleClose={() => setIsOpenSnack(false)}
      />
    </Container>
  );
}
