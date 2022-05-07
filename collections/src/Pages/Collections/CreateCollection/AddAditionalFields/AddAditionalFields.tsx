import { Box } from '@mui/system';
import { MenuItem, TextField, IconButton, Avatar, Chip, ListItem, Paper } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useStyles } from './styles';
import { AppContext } from '../../../../app/context/AppContext';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { regulars } from '../../../../shared/constants/regularExpressions';

export type Field = {
  type?: string | null;
  name?: string | null;
};
type FieldsPropsType = {
  isReset: boolean;
  handleSubmitField: (field: Field) => void;
};

export const AddAditionalFields = ({ isReset, handleSubmitField }: FieldsPropsType) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });
  const {
    state: { theme },
  } = useContext(AppContext);
  const classes = useStyles(theme);

  const [type, setSelectType] = useState('' as string | null);
  const [name, setName] = useState('' as string | null);
  const [fields, setFields] = useState([] as Field[]);

  useEffect(() => {
    if (isReset) {
      setSelectType('');
      setName('');
      setFields([]);
    }
  }, [isReset]);

  const onSubmit = ({ type, name }: Field) => {
    if (fields.find((elem) => elem.name == name)) {
      setError('name', {
        type: 'custom',
        message: intl.formatMessage({ id: 'create-collection-error-field-exist' }),
      });
      return;
    }
    setFields(fields.concat({ type, name }));
    handleSubmitField({ type, name });
    setSelectType('');
    setName('');
  };

  return (
    <>
      {fields.length > 0 && (
        <Paper className={classes.container}>
          <ListItem className={classes.listItem}>
            {fields.map((field: Field) => (
              <Chip
                key={field.name}
                avatar={<Avatar>{field?.type?.[0]}</Avatar>}
                label={field.name}
                onDelete={() => {
                  setFields(fields.filter((elem) => elem.name != field.name));
                }}
              />
            ))}
          </ListItem>
        </Paper>
      )}
      <Box className={classes.containerField}>
        <TextField
          className={classes.select}
          select
          value={type}
          helperText={errors?.type?.message}
          error={errors?.type ? true : false}
          label={intl.formatMessage({ id: 'create-collection-field-type' })}
          {...register('type', {
            onChange: (e) => {
              setSelectType(e.target.value);
              clearErrors('type');
            },
            required: intl.formatMessage({ id: 'create-collection-error-type' }),
          })}
        >
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="string">String</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="boolean">Checkbox</MenuItem>
        </TextField>
        <TextField
          className={classes.input}
          value={name}
          helperText={errors?.name?.message}
          error={errors?.name ? true : false}
          label={intl.formatMessage({ id: 'create-collection-field-name' })}
          {...register('name', {
            onChange: (e) => {
              setName(e.target.value);
              clearErrors('name');
            },
            required: intl.formatMessage({ id: 'create-collection-field-error-name' }),
            pattern: {
              value: regulars.NAME,
              message: intl.formatMessage({ id: 'create-collection-name-pattern' }),
            },
          })}
          variant="outlined"
        />
        <Box className={classes.buttonWrapper}>
          <IconButton color="primary" onClick={handleSubmit(onSubmit)}>
            <AddCircleOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};
