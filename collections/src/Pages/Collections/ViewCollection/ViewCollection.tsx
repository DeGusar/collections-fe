/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, IconButton, LinearProgress, Paper, Typography } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { AdditionalFieldType, ItemsRowsType } from '../../../types';
import {
  DataGrid,
  GridRowParams,
  GridToolbarExport,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { columns } from './columns';
import { capitalize } from '../../../shared/helpers/capitalize';
import AddIcon from '@mui/icons-material/Add';
import { CreateItem } from './CreateItem/CreateItem';
import { SnackCreate } from '../CreateCollection/Snack/Snack';
import { FormattedMessage, useIntl } from 'react-intl';
import { deleteItemById, getItemByIdCollection } from '../../../shared/api/itemsApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DialogDelete } from './DialogDelete/DialogDelete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import routes from '../../../shared/constants/routes';
import { EditItem } from './EditItem/EditItem';
import { AppContext } from '../../../app/context/AppContext';
import localStorageKeys from '../../../shared/constants/localStorageKeys';

export const ViewCollection = () => {
  const { userId, idCollection } = useParams();
  const user = localStorage.getItem(`${localStorageKeys.USER_ID}`);
  const role = localStorage.getItem(`${localStorageKeys.ROLE}`);

  const navigate = useNavigate();
  const intl = useIntl();
  const { state } = useContext(AppContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogEdit, setIsOpenDialogEdit] = useState(false);
  const [idItemToDelete, setIdItemToDelete] = useState('');
  const [idItemUpdate, setIdItemUpdate] = useState('');
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [additionalField, setAdditional] = useState([] as AdditionalFieldType[]);
  const [snackMessage, setSnackMessage] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const [nameCollection, setNameCollection] = useState('');
  const [description, setDescription] = useState('');

  const [columnsGrid, setColumnsGrid] = useState(columns as unknown as AdditionalFieldType[]);

  const getItems = async () => {
    const { data } = await getItemByIdCollection(idCollection as string);
    setItems(data);
  };

  const getCollection = async () => {
    const { data } = await getCollectionByIdCollection(idCollection as string);
    const { additional, nameCollection, description } = data[0];
    setNameCollection(nameCollection);
    setDescription(description);
    const add = additional.map((addField: AdditionalFieldType, i: number) => {
      return {
        field: addField.name,
        headerName: capitalize(addField.name),
        flex: addField.type === 'boolean' ? 0.4 : 1,
        type: addField.type === 'text' ? 'string' : addField.type,
        valueGetter: (params: GridValueGetterParams) => {
          return params.getValue(params.row._id, 'additional')[i].value;
        },
      };
    });
    setAdditional(
      add.concat({
        field: 'Actions',
        flex: 0.5,
        minWidth: 120,
        renderCell: (params: GridRowParams) => {
          const onClickDelete = () => {
            setIdItemToDelete(params.row._id);
            setIsOpenDialogDelete(true);
          };
          const onClickEdit = () => {
            const idItem = params.row._id;
            setIdItemUpdate(idItem);
            setIsOpenDialogEdit(true);
          };
          const onClickOpen = () => {
            const idItem = params.row._id;
            navigate(`${`${routes.COLLECTIONS_ROOT}/${userId}/${idCollection}/item/${idItem}`}`);
          };
          return (
            <>
              {((state.isAuthorised && userId === user) || role === 'admin') && (
                <>
                  <IconButton
                    color="inherit"
                    sx={{ opacity: '0.6' }}
                    size="small"
                    onClick={onClickEdit}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    sx={{ opacity: '0.6' }}
                    onClick={onClickDelete}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
              <IconButton
                color="inherit"
                sx={{ opacity: '0.6' }}
                onClick={onClickOpen}
                size="small"
              >
                <OpenInNewIcon />
              </IconButton>
            </>
          );
        },
        disableClickEventBubbling: true,
      })
    );
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      await getItems();
      await getCollection();
      setIsLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    setColumnsGrid((prevColumns) => prevColumns.concat(additionalField));
  }, [additionalField]);

  function EditToolbar() {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'start',
          marginLeft: '30px',
          columnGap: '20px',
        }}
      >
        {((state.isAuthorised && userId === user) || role === 'admin') && (
          <Button
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => {
              setIsOpenDialog(true);
            }}
          >
            <FormattedMessage id="items-table-add-item" />
          </Button>
        )}

        <GridToolbarExport color="secondary" />
      </Box>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteItemById(idItemToDelete);
      setIsOpenDialogDelete(false);
      getItems();
      navigate(`${routes.COLLECTIONS_ROOT}/${userId}/${idCollection}`);
      setSnackMessage(intl.formatMessage({ id: 'item-successfully-deleted' }));
      setIsOpenSnack(true);
    } catch (e) {
      console.log('error');
    }
  };

  return (
    <>
      <Typography variant="h5" align="center">
        <FormattedMessage id="items-title-collection" /> {capitalize(nameCollection)}
      </Typography>
      <Typography align="center">{description}</Typography>
      <div className="App">
        <Paper elevation={2} style={{ width: '100%', marginTop: '10px', overflow: 'hidden' }}>
          <DataGrid
            scrollbarSize={17}
            rows={items as ItemsRowsType[]}
            disableSelectionOnClick={true}
            columns={columnsGrid}
            editMode="row"
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: EditToolbar,
            }}
            loading={isLoading}
            localeText={{
              toolbarExport: `${intl.formatMessage({ id: 'export-button' })}`,
              toolbarExportCSV: `${intl.formatMessage({ id: 'export-download-csv' })}`,
              toolbarExportPrint: `${intl.formatMessage({ id: 'export-print-csv' })}`,
            }}
            pageSize={10}
            getRowId={(row) => row._id}
            autoHeight={true}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
          />
        </Paper>
      </div>
      {isOpenDialog && (
        <CreateItem
          isOpenDialog={isOpenDialog}
          refreshView={() => {
            getItems();
            navigate(`${routes.COLLECTIONS_ROOT}/${userId}/${idCollection}`);
            setSnackMessage(intl.formatMessage({ id: 'item-successfully-created' }));
            setIsOpenSnack(true);
          }}
          handleClick={() => setIsOpenDialog(false)}
        />
      )}
      {isOpenDialogEdit && (
        <EditItem
          isOpenDialog={isOpenDialogEdit}
          idItem={idItemUpdate}
          refreshView={() => {
            getItems();
            navigate(`${routes.COLLECTIONS_ROOT}/${userId}/${idCollection}`);
            setSnackMessage(intl.formatMessage({ id: 'item-successfully-updated' }));
            setIsOpenSnack(true);
          }}
          handleClick={() => setIsOpenDialogEdit(false)}
        />
      )}

      <SnackCreate
        isOpen={isOpenSnack}
        handleClose={() => setIsOpenSnack(false)}
        message={snackMessage}
      ></SnackCreate>
      {isOpenDialogDelete && (
        <DialogDelete
          isOpenDialog={isOpenDialogDelete}
          handleDelete={() => handleDelete()}
          setIsOpenDialog={() => setIsOpenDialogDelete(false)}
        />
      )}
      <Outlet />
    </>
  );
};
