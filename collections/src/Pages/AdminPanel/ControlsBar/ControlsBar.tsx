import { Button, Container, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import React from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { FormattedMessage } from 'react-intl';

type ControlBarType = {
  handleClickBlock: React.MouseEventHandler<HTMLButtonElement>;
  handleClickUnblock: React.MouseEventHandler<HTMLButtonElement>;
  handleClickDelete: React.MouseEventHandler<HTMLButtonElement>;
  handleClickAdmin: React.MouseEventHandler<HTMLButtonElement>;
};

export function ControlBar({
  handleClickBlock,
  handleClickUnblock,
  handleClickDelete,
  handleClickAdmin,
}: ControlBarType) {
  return (
    <Container
      maxWidth={false}
      sx={{ mt: 2, justifyContent: 'space-between', flexWrap: 'nowrap', display: 'flex' }}
    >
      <Box sx={{ pl: 5 }}>
        <Button variant="contained" color="secondary" onClick={handleClickBlock}>
          <FormattedMessage id="admin-panel-controls-block" />
        </Button>
        <Button
          color="secondary"
          sx={{ ml: 1 }}
          variant="contained"
          onClick={handleClickUnblock}
          startIcon={<SettingsBackupRestoreIcon />}
        >
          <FormattedMessage id="admin-panel-controls-unblock" />
        </Button>
        <Button
          color="secondary"
          sx={{ ml: 1 }}
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleClickDelete}
        >
          <FormattedMessage id="admin-panel-controls-delete" />
        </Button>
        <Button
          color="secondary"
          sx={{ ml: 1 }}
          variant="contained"
          startIcon={<ManageAccountsIcon />}
          onClick={handleClickAdmin}
        >
          <FormattedMessage id="admin-panel-controls-admin" />
        </Button>
      </Box>
    </Container>
  );
}
