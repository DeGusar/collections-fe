import { Box, Container, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';
import { getCollectionByIdCollection, updateCollection } from '../../../shared/api/collectionsApi';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { regulars } from '../../../shared/constants/regularExpressions';
import { FileUploader } from 'react-drag-drop-files';
import { LoadingButton } from '@mui/lab';
import { uploadImage } from '../../../shared/api/imageApi';
import { CollectionFormType } from '../../../types';
import { images } from '../../../shared/constants/imagesByTheme';
import routes from '../../../shared/constants/routes';
import { BreadCrumps } from '../BreadCrumps/BreadCrumps';

export const EditCollection = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const { state } = useContext(AppContext);
  const classes = useStyles(state.theme);
  const { userId, idCollection } = useParams();
  const navigate = useNavigate();

  const intl = useIntl();

  const [isDisable, setDisable] = useState(false);
  const [name, setName] = useState('');
  const [descriptionCollection, setdescriptionCollection] = useState('');
  const [file] = useState('' as unknown as Blob | null);
  const [currentSelect, setSelect] = useState('' as string | null);
  const [imageSrc, setImageSrc] = useState('');

  const fileTypes = ['JPEG', 'PNG', 'GIF', 'JPG'];
  const themeValues = ['default', 'wine', 'books', 'postcards', 'coins'];
  const collectionsThemes = [
    `${intl.formatMessage({ id: 'create-collections-theme-without' })}`,
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

  const getCollection = async () => {
    const { data } = await getCollectionByIdCollection(idCollection as string);
    const { description, theme, nameCollection, imageSrc } = data[0];
    setdescriptionCollection(description);
    setValue('description', description);
    setName(nameCollection);
    setValue('nameCollection', nameCollection);
    setSelect(theme);
    setValue('theme', theme);
    imageSrc !== images[theme] && setImageSrc(imageSrc);
  };

  useEffect(() => {
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async ({ nameCollection, description, theme }: CollectionFormType) => {
    try {
      const response = await updateCollection({
        nameCollection,
        description,
        theme,
        imageSrc: imageSrc || images[`${theme}`],
        userId,
        idCollection,
      });
      if (response.status == 200) {
        navigate(`${routes.COLLECTIONS_ROOT}/${userId}`);
      }
    } catch (e) {}
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <BreadCrumps currentPage={'card-collection-edit'} />
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
          <Box className={classes.buttonWrap}>
            <LoadingButton
              type="submit"
              className={classes.buttonSubmit}
              loadingIndicator={intl.formatMessage({ id: 'create-collection-upload-loading' })}
              size="large"
              loading={isDisable}
              variant="contained"
            >
              <FormattedMessage id="card-collection-edit" />
            </LoadingButton>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
};
