/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { AppContext } from '../../../../app/context/AppContext';
import { getItemByIdItem, updateItem } from '../../../../shared/api/itemsApi';
import { deleteTagById, getAllTags } from '../../../../shared/api/tagApi';
import { capitalize } from '../../../../shared/helpers/capitalize';
import { Additional, EditItemProps, StringMap, TagType } from '../../../../types';
import { useStyles } from './styles';

export const EditItem = ({ isOpenDialog, handleClick, refreshView, idItem }: EditItemProps) => {
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([] as string[]);
  const [tagsForRemoving, setTagsForRemoving] = useState([] as string[]);
  const [tagCloud, setTagCloud] = useState([] as string[]);
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
      const { data } = await getItemByIdItem(idItem as string);
      const { additional, tags, nameItem } = data;
      setTags(tags);
      setValue('nameItem', nameItem);
      setAdditionalFields(additional);
    };
    getCollection();
  }, []);

  const onSubmit = async (data: StringMap) => {
    for (const tag of tagsForRemoving) {
      await deleteTagById(idItem, tag);
    }
    const additionalData = Object.keys(data)
      .splice(1)
      .map((field) => {
        if (field !== 'nameItem') {
          return { ...additionalFields.find((item) => item.name === field), value: data[field] };
        }
      }) as Additional[];
    try {
      const response = await updateItem(idItem, {
        nameItem: data.nameItem,
        additional: additionalData,
        tags: tags,
      });
      if (response.status === 200) {
        handleClick();
        refreshView();
      }
    } catch (e) {
      setError('nameItem', {
        type: 'custom',
        message: intl.formatMessage({ id: 'item-create-error-already-exist' }),
      });
    }
  };

  return (
    <Dialog open={isOpenDialog} onClose={handleClick}>
      <DialogTitle>
        <FormattedMessage id="item-edit-dialog-title" />
      </DialogTitle>
      <DialogContent className={classes.content}>
        <TextField
          error={errors?.nameItem ? true : false}
          sx={{ mt: 0.5 }}
          helperText={errors?.nameItem?.message}
          {...register('nameItem', {
            required: intl.formatMessage({ id: 'item-collection-error-name' }),
          })}
          fullWidth
          label="Item name"
        />
        <Autocomplete
          multiple
          filterSelectedOptions
          autoComplete={true}
          value={tags}
          options={tagCloud}
          onChange={(event, value, situation, option) => {
            if (situation === 'removeOption') {
              setTagsForRemoving((prev) => prev.concat(option?.option as string));
            }
            setTags(value);
          }}
          fullWidth
          freeSolo
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip {...getTagProps({ index })} variant="outlined" label={option} key={index} />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              helperText={intl.formatMessage({ id: 'create-item-helper-tags' })}
              fullWidth
            />
          )}
        />
        {additionalFields.length > 0 &&
          additionalFields.map((field) => {
            if (field.type === 'boolean') {
              return (
                <FormControlLabel
                  control={<Checkbox defaultChecked={field.value as unknown as boolean} />}
                  {...register(field.name, {})}
                  label={field.name}
                  key={field.name}
                />
              );
            } else if (field.type === 'date') {
              return (
                <TextField
                  label={capitalize(field.name)}
                  type="date"
                  fullWidth
                  key={field.name}
                  {...register(field.name, {})}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={field.value}
                />
              );
            } else {
              return (
                <TextField
                  label={capitalize(field.name)}
                  key={field.name}
                  fullWidth
                  multiline={field.type === 'text' ? true : false}
                  {...register(field.name, {})}
                  defaultValue={field.value}
                ></TextField>
              );
            }
          })}
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={handleClick}>
          <FormattedMessage id="card-collection-cancel" />
        </Button>
        <Button color="secondary" onClick={handleSubmit(onSubmit)}>
          <FormattedMessage id="item-edit-button" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
