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

export default function Collections() {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
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
    <Container maxWidth="xl">
      <Box className={classes.container}>
        {collections.length > 0 &&
          collections.map((collection: CardCollectionType) => (
            <CardCollection {...collection} key={collection._id} />
          ))}
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
