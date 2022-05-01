import { Box, Container, Typography, Paper, TextField, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useStyles } from './styles';
import { AppContext } from '../../../app/context/AppContext';
import { useNavigate } from 'react-router-dom';
import routes from '../../../shared/constants/routes';
import { FormattedMessage } from 'react-intl';
import MenuItem from '@mui/material/MenuItem';
import { useIntl } from 'react-intl';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';

export type dataFormType = {
  nameCollection?: string;
  description?: string;
  theme?: string;
};

export const CreateCollection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const intl = useIntl();
  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const [file, setFile] = useState('' as unknown as Blob);
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

  const onSubmit = (data: dataFormType) => {
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImage(reader.result as ArrayBuffer);
    };
  };

  const uploadImage = async (base64EncodedImage: ArrayBuffer) => {
    try {
      await fetch('http://localhost:5000/images/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4">
        <FormattedMessage id="create-collection-title" />
      </Typography>
      <Container maxWidth="sm">
        <Paper
          className={classes.paper}
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h4" align="center">
            <FormattedMessage id="create-collection-content" />
          </Typography>
          <TextField
            required
            {...register('nameCollection', {
              required: 'Поле обязательно к заполнению',
            })}
            fullWidth
            label={intl.formatMessage({ id: 'create-collections-name' })}
          />
          <TextField
            multiline
            required
            {...register('description', {
              required: 'Поле обязательно к заполнению',
            })}
            fullWidth
            label={intl.formatMessage({ id: 'create-collections-description' })}
          />
          <TextField
            id="outlined-select-currency"
            select
            required
            label={intl.formatMessage({ id: 'create-collections-theme' })}
            fullWidth
            {...register('theme', {})}
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
            className={classes.upload}
            label={intl.formatMessage({ id: 'create-collection-upload-message' })}
            handleChange={(file: Blob) => {
              setFile(file);
              console.log(file);
            }}
            name="file"
            types={fileTypes}
          />
          <Button type="submit">Create</Button>
        </Paper>
      </Container>
      <Box className={classes.container}></Box>
    </Container>
  );
};
