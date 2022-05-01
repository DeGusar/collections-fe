import { Modal, Paper, Box, InputBase, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import { AppContext } from '../../app/context/AppContext';
import { useStyles } from './styles';
import SearchIcon from '@mui/icons-material/Search';
import { useIntl } from 'react-intl';

export const SearchModal = () => {
  const intl = useIntl();
  const { state, dispatch } = useContext(AppContext);
  const classes = useStyles(state.theme);
  return (
    <Modal
      BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      disablePortal={true}
      sx={{ zIndex: '1' }}
      onClose={() => dispatch({ type: 'setModalSearch' })}
      open={state.isModalSearch}
    >
      <Box className={classes.box}>
        <Paper className={classes.paper} sx={{}}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={intl.formatMessage({ id: 'modal-search-search' })}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Modal>
  );
};
