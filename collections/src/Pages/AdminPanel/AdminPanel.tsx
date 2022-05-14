import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { ControlBar } from './ControlsBar/ControlsBar';
import { columns } from './Colums/colums';
import { Snack } from './Snack/Snack';
import {
  blockUsers,
  deleteUsers,
  getUsers,
  setAdmin,
  unblockUsers,
} from '../../shared/api/authApi';
import { AlertColor } from '@mui/material';
import { UsersType } from '../../types';
import localStorageKeys from '../../shared/constants/localStorageKeys';
export const AdminPanel = () => {
  const role = localStorage.getItem(localStorageKeys.ROLE);
  const id = localStorage.getItem(localStorageKeys.USER_ID);
  const [users, setUsers] = useState([]);
  const [severityType, setSeverityType] = useState('success' as AlertColor);
  const [messageSnack, setMessageSnack] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);

  const [selectedIds, setSelectedIds] = useState([] as string[]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers();
        setIsLoading(false);
        setUsers(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetch();
  }, []);

  const handleClickBlock = async () => {
    try {
      await blockUsers(selectedIds);
      const usersData = await getUsers();
      setUsers(usersData.data);
      setMessageSnack('User blocked');
      setSeverityType('success');
      setIsOpenSnack(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClickUnblock = async () => {
    await unblockUsers(selectedIds);
    const usersData = await getUsers();
    setUsers(usersData.data);
    setMessageSnack('User unblocked');
    setSeverityType('success');
    setIsOpenSnack(true);
  };
  const handleClickDelete = async () => {
    try {
      await deleteUsers(selectedIds);
      const usersData = await getUsers();
      setUsers(usersData.data);
      setMessageSnack('User deleted');
      setSeverityType('success');
      setIsOpenSnack(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleClickAdmin = async () => {
    try {
      await setAdmin(selectedIds);
      const usersData = await getUsers();
      setUsers(usersData.data);
      setMessageSnack("User's role changed to 'admin'");
      setSeverityType('success');
      setIsOpenSnack(true);
    } catch (e) {
      console.log(e);
    }
  };
  return role === 'admin' ? (
    <div className="App">
      <ControlBar
        handleClickBlock={handleClickBlock}
        handleClickUnblock={handleClickUnblock}
        handleClickDelete={handleClickDelete}
        handleClickAdmin={handleClickAdmin}
      />
      <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={users as UsersType[]}
          columns={columns}
          isRowSelectable={(params: GridRowParams) =>
            params.row._id !== id && params.row.email !== 'admin'
          }
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={isLoading}
          pageSize={10}
          getRowId={(row) => row._id}
          autoHeight={true}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(itm) => {
            const checked = itm.toString().split(',');
            setSelectedIds(checked);
          }}
        />
      </div>
      <Snack
        isOpen={isOpenSnack}
        severityType={severityType}
        message={messageSnack}
        handleClose={() => setIsOpenSnack(false)}
      />
    </div>
  ) : (
    <p>Not Access</p>
  );
};
