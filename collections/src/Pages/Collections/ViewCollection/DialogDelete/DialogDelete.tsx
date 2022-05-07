import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { DialogDeleteType } from '../../../../types';

export const DialogDelete = ({ isOpenDialog, handleDelete, setIsOpenDialog }: DialogDeleteType) => {
  return (
    <Dialog open={isOpenDialog} onClose={setIsOpenDialog}>
      <DialogTitle>
        <FormattedMessage id="item-delete-dialog-title" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="card-collction-dialog-content" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={setIsOpenDialog}>
          <FormattedMessage id="card-collection-cancel" />
        </Button>
        <Button onClick={handleDelete} autoFocus>
          <FormattedMessage id="card-collection-delete" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
