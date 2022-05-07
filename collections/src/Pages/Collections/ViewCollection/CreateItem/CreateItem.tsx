/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  useRadioGroup,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../../../app/context/AppContext';
import { getCollectionByIdCollection } from '../../../../shared/api/collectionsApi';
import { createItem } from '../../../../shared/api/itemsApi';
import { getAllTags } from '../../../../shared/api/tagApi';
import {
  Additional,
  AdditionalFieldType,
  CreateItemProps,
  ItemsDataType,
  TagType,
} from '../../../../types';
import { useStyles } from './styles';

export const CreateItem = ({ isOpenDialog, handleClick }: CreateItemProps) => {
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([] as string[]);
  const [tagCloud, setTagCloud] = useState([]);
  const { idCollection, userId } = useParams();
  const [additionalFields, setAdditionalFields] = useState([] as StringMap[]);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await getAllTags();
      const tags = data.map((tag: TagType) => tag.value);
      setTagCloud(tags);
    };
    getTags();
  }, []);
  useEffect(() => {
    const getCollection = async () => {
      const { data } = await getCollectionByIdCollection(idCollection as string);
      const { additional } = data[0];
      setAdditionalFields(additional);
    };
    getCollection();
  }, []);

  interface StringMap {
    [key: string]: string;
  }

  const onSubmit = async (data: StringMap) => {
    const additionalData = Object.keys(data)
      .splice(1)
      .map((field) => {
        if (field !== 'nameItem') {
          return { ...additionalFields.find((item) => item.name === field), value: data[field] };
        }
      }) as Additional[];
    try {
      const response = await createItem({
        nameItem: data.nameItem,
        idCollection: idCollection,
        userId: userId,
        additional: additionalData,
        tags: tags,
      });
      if (response.status === 200) {
        handleClick();
      }
    } catch (e) {
      setError('nameItem', {
        type: 'custom',
        message: intl.formatMessage({ id: 'item-create-error-already-exist' }),
      });
    }
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <FormattedMessage id="item-create-dialog-title" />
      </DialogTitle>
      <DialogContent className={classes.content}>
        <TextField
          error={errors?.nameItem ? true : false}
          helperText={errors?.nameItem?.message}
          {...register('nameItem', {
            required: intl.formatMessage({ id: 'item-collection-error-name' }),
          })}
          fullWidth
          label={intl.formatMessage({ id: 'create-collections-name' })}
        />
        <Autocomplete
          multiple
          filterSelectedOptions
          autoComplete={true}
          options={tagCloud}
          onChange={(event, value) => setTags(value)}
          fullWidth
          freeSolo
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
            ))
          }
          renderInput={(params) => <TextField {...params} label="Tags" fullWidth />}
        />
        {additionalFields.length > 0 &&
          additionalFields.map((field) => {
            if (field.type === 'boolean') {
              return (
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  {...register(field.name, {})}
                  label={field.name}
                />
              );
            } else {
              return (
                <TextField
                  label={field.name}
                  key={field.name}
                  fullWidth
                  multiline={field.type === 'text' ? true : false}
                  {...register(field.name, {})}
                ></TextField>
              );
            }
          })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>
          <FormattedMessage id="card-collection-cancel" />
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>
          <FormattedMessage id="card-collection-create" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
