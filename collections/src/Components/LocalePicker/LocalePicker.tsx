import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { AppContext } from '../../app/context/AppContext';
import { locales } from '../../shared/constants/locales';
import localStorageKeys from '../../shared/constants/localStorageKeys';

export default function LocalePicker() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Box>
      <FormControl variant="standard">
        <InputLabel id="demo-simple-select-standard-label">
          <FormattedMessage id="header.language-picker" />
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          value={state.currentLocale}
          onChange={(e) => {
            dispatch({ type: 'setLocale', payload: e.target.value });
            localStorage.setItem(localStorageKeys.LOCALE, e.target.value);
            console.log(state.currentLocale);
          }}
          label="Age"
        >
          <MenuItem value={locales.EN}>English</MenuItem>
          <MenuItem value={locales.RU}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
