import { Box, Container, Typography, Paper, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useStyles } from './styles';
import { AppContext } from '../../../app/context/AppContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/constants/routes';
import { FormattedMessage } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';
import { useIntl } from 'react-intl';
import { FileUploader } from 'react-drag-drop-files';

export const CreateCollection = () => {
  const intl = useIntl();
  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const [file, setFile] = useState(null as unknown);
  const collectionsThemes = [
    `${intl.formatMessage({ id: 'create-collections-theme-wine' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-books' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-postcards' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-coins' })}`,
  ];

  const [currentSelect, setSelect] = useState('');
  const navigate = useNavigate();
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">
        <FormattedMessage id="create-collection-title" />
      </Typography>
      <Container maxWidth="sm">
        <Paper
          className={classes.paper}
          component="form"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h4" align="center">
            <FormattedMessage id="create-collection-content" />
          </Typography>
          <TextField
            required
            fullWidth
            label={intl.formatMessage({ id: 'create-collections-name' })}
          />
          <TextField
            multiline
            required
            fullWidth
            label={intl.formatMessage({ id: 'create-collections-description' })}
            InputProps={{ disableUnderline: true }}
          />
          <TextField
            id="outlined-select-currency"
            select
            required
            label={intl.formatMessage({ id: 'create-collections-theme' })}
            fullWidth
            value={currentSelect}
            onChange={(event) => setSelect(event.target.value)}
          >
            {collectionsThemes.map((theme) => (
              <MenuItem key={theme} value={theme}>
                {theme}
              </MenuItem>
            ))}
          </TextField>
          <FileUploader
            multiple={true}
            className={classes.upload}
            label={intl.formatMessage({ id: 'create-collection-upload-message' })}
            handleChange={(file: FileList) => {
              setFile(file);
            }}
            name="file"
            types={fileTypes}
          />
        </Paper>
      </Container>
      <Box className={classes.container}></Box>
    </Container>
  );
};
