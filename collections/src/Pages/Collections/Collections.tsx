import { Fab, Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext } from 'react';
import { useStyles } from './styles';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../app/context/AppContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';

export default function Collections() {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId);
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);

  return (
    <Container maxWidth="xl">
      <Box className={classes.container}>
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
