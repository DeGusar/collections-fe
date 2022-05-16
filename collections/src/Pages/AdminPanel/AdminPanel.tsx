import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { ControlBar } from './ControlsBar/ControlsBar';
import { Snack } from './Snack/Snack';
import date from 'date-and-time';
import {
  blockUsers,
  deleteUsers,
  getUsers,
  setAdmin,
  unblockUsers,
} from '../../shared/api/authApi';
import { AlertColor, IconButton } from '@mui/material';
import { UsersType } from '../../types';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import { useNavigate } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { dateFormats } from '../../shared/constants/dataFormats';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const columns: GridColumns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.5,
    },
    { field: 'firstName', headerName: 'First name', flex: 0.7 },
    { field: 'lastName', headerName: 'Last name', flex: 0.7 },
    { field: 'email', headerName: 'Email adress', flex: 1 },
    {
      field: 'registration',
      headerName: 'Registration',
      type: 'date',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        const dateParams = new Date(params.value);
        return date.format(dateParams, `${dateFormats.DATE}`);
      },
    },
    {
      field: 'lastVisit',
      headerName: 'Last visit',
      type: 'dateTime',
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        const dateParams = new Date(params.value);
        return date.format(dateParams, `${dateFormats.TIME}`);
      },
    },
    { field: 'role', headerName: 'Role', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    {
      field: 'Actions',
      flex: 0.5,
      minWidth: 120,

      renderCell: (params: GridRenderCellParams) => {
        const onClickOpen = () => {
          const userId = params.row._id;
          navigate(`/collections/${userId}`);
        };
        return (
          <IconButton
            color="inherit"
            sx={{ opacity: '0.6' }}
            onClick={(e) => {
              e.preventDefault();
              onClickOpen();
            }}
            size="small"
          >
            <OpenInNewIcon />
          </IconButton>
        );
      },
    },
  ];

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
