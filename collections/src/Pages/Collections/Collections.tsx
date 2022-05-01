import { Fab, Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext } from 'react';
import { useStyles } from './styles';
import { AppContext } from '../../app/context/AppContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';

export default function Collections() {
  const navigate = useNavigate();
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
          onClick={() => navigate(`${routes.COLLECTION_CREATE}`)}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
}
