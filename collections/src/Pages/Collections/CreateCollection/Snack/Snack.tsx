import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SnackType } from '../../../../types';

export function SnackCreate({ isOpen, handleClose, message }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity="success">
        <FormattedMessage id={message} />
      </Alert>
    </Snackbar>
  );
}
