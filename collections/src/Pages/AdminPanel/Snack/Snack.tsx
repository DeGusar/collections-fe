import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { SnackType } from '../../../types';

export function Snack({ isOpen, handleClose, severityType, message }: SnackType) {
  return (
    <Snackbar
      autoHideDuration={3000}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={severityType}>{message}</Alert>
    </Snackbar>
  );
}
