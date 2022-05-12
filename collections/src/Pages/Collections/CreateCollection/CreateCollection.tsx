import { Box, Container, Typography, Paper, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useStyles } from './styles';
import { AppContext } from '../../../app/context/AppContext';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { LoadingButton } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import { FileUploader } from 'react-drag-drop-files';
import { useForm } from 'react-hook-form';
import { CollectionFormType } from '../../../types';
import { createCollection } from '../../../shared/api/collectionsApi';
import { uploadImage } from '../../../shared/api/imageApi';
import { SnackCreate } from './Snack/Snack';
import { AddAditionalFields, Field } from './AddAditionalFields/AddAditionalFields';
import { regulars } from '../../../shared/constants/regularExpressions';
import { BreadCrumps } from '../BreadCrumps/BreadCrumps';
import { images } from '../../../shared/constants/imagesByTheme';

export const CreateCollection = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm({ reValidateMode: 'onSubmit' });

  const {
    state: { theme, userName },
  } = useContext(AppContext);

  const classes = useStyles(theme);

  const [isDisable, setDisable] = useState(false);
  const [isReset, setReset] = useState(false);
  const [name, setName] = useState('');
  const [descriptionCollection, setdescriptionCollection] = useState('');
  const [isSnack, setIsSnack] = useState(false);
  const [file, setFile] = useState('' as unknown as Blob | null);
  const [currentSelect, setSelect] = useState('' as string | null);
  const [imageSrc, setImageSrc] = useState('');
  const [additionalFields, setFields] = useState([] as Field[]);

  const intl = useIntl();

  const { userId } = useParams();

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const themeValues = ['wine', 'books', 'postcards', 'coins'];
  const collectionsThemes = [
    `${intl.formatMessage({ id: 'create-collections-theme-wine' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-books' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-postcards' })}`,
    `${intl.formatMessage({ id: 'create-collections-theme-coins' })}`,
  ];

  const handleChangeImage = async (file: Blob) => {
    if (file) {
      setDisable(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const response = await uploadImage(JSON.stringify(reader.result));
        setImageSrc(response?.data?.srcImage);
        setDisable(false);
      };
    }
  };

  const onSubmit = async ({ nameCollection, description, theme }: CollectionFormType) => {
    try {
      const response = await createCollection({
        nameCollection,
        description,
        theme,
        imageSrc: imageSrc || images[`${theme}` || 'default'],
        userId,
        additional: additionalFields,
        author: userName as string,
      });
      if (response.status == 200) {
        setFields([]);
        setReset(true);
        setImageSrc('');
        setFile(null);
        setSelect('');
        setdescriptionCollection('');
        setName('');
        reset();
        setIsSnack(true);
        setReset(false);
      }
    } catch (e) {
      setError('nameCollection', {
        type: 'custom',
        message: intl.formatMessage({ id: 'create-collection-error-already-exist' }),
      });
    }
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <BreadCrumps currentPage={'breadcrumps-create'} />
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
            error={errors?.nameCollection ? true : false}
            helperText={errors?.nameCollection?.message}
            {...register('nameCollection', {
              required: intl.formatMessage({ id: 'create-collection-error-name' }),
              onChange: (e) => {
                setName(e.target.value);
                clearErrors('nameCollection');
              },
              pattern: {
                value: regulars.NAME,
                message: intl.formatMessage({ id: 'create-collection-name-pattern' }),
              },
            })}
            fullWidth
            value={name}
            label={intl.formatMessage({ id: 'create-collections-name' })}
          />
          <TextField
            multiline
            error={errors?.description ? true : false}
            helperText={errors?.description?.message}
            {...register('description', {})}
            fullWidth
            value={descriptionCollection}
            onChange={(e) => setdescriptionCollection(e.target.value)}
            label={intl.formatMessage({ id: 'create-collections-description' })}
          />
          <TextField
            id="outlined-select-currency"
            select
            label={intl.formatMessage({ id: 'create-collections-theme' })}
            fullWidth
            {...register('theme', {})}
            value={currentSelect}
            onChange={(event) => setSelect(event.target.value)}
          >
            {collectionsThemes.map((theme, i) => (
              <MenuItem key={theme} value={themeValues[i]}>
                {theme}
              </MenuItem>
            ))}
          </TextField>
          <FileUploader
            className={classes.upload}
            fileOrFiles={file}
            maxSize={2}
            label={intl.formatMessage({ id: 'create-collection-upload-message' })}
            handleChange={(file: Blob) => {
              handleChangeImage(file);
            }}
            name="file"
            types={fileTypes}
          />
          <Typography className={classes.fieldTitle}>
            <FormattedMessage id="create-collection-additional-fields-title" />
          </Typography>
          <AddAditionalFields
            isReset={isReset}
            handleSubmitField={(field) => setFields(additionalFields.concat(field))}
          />
          <Box className={classes.buttonWrap}>
            <LoadingButton
              color="secondary"
              type="submit"
              className={classes.buttonSubmit}
              loadingIndicator={intl.formatMessage({ id: 'create-collection-upload-loading' })}
              size="large"
              loading={isDisable}
              variant="contained"
            >
              <FormattedMessage id="create-collection-button-create" />
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
      <SnackCreate
        isOpen={isSnack}
        message="create-collection-snack-created"
        handleClose={() => setIsSnack(false)}
      ></SnackCreate>
    </Container>
  );
};
