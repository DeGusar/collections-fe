/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';
import { Box, Button, IconButton, LinearProgress } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { useParams } from 'react-router-dom';
import { AdditionalFieldType, ItemsRowsType } from '../../../types';
import {
  DataGrid,
  GridRowParams,
  GridToolbar,
  GridToolbarContainer,
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

export const ViewCollection = () => {
  const { state } = useContext(AppContext);
  const { userId, idCollection } = useParams();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [idItemToDelete, setIdItemToDelete] = useState('');
  const [isOpenDialogDelete, setIsOpenDialogDelete] = useState(false);
  const [additionalField, setAdditional] = useState([] as AdditionalFieldType[]);
  const [snackMessage, setSnackMessage] = useState('');
  const [items, setItems] = useState([]);
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([] as string[]);
  const [isOpenSnack, setIsOpenSnack] = useState(false);
  const classes = useStyles(state.theme);

  const [columnsGrid, setColumnsGrid] = useState(columns as unknown as AdditionalFieldType[]);

  const getItems = async () => {
    const { data } = await getItemByIdCollection(idCollection as string);
    setItems(data);
  };

  const getCollection = async () => {
    const { data } = await getCollectionByIdCollection(idCollection as string);
    const { additional } = data[0];
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
        width: 120,
        renderCell: (params: GridRowParams) => {
          const onClickDelete = () => {
            setIdItemToDelete(params.row._id);
            setIsOpenDialogDelete(true);
          };
          const onClickEdit = () => {};
          const onClickOpen = () => {};
          return (
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
      await getItems();
      await getCollection();
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
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsOpenDialog(true);
          }}
        >
          <FormattedMessage id="items-table-add-item" />
        </Button>

        <GridToolbarExport />
      </Box>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteItemById(idItemToDelete);
      setIsOpenDialogDelete(false);
      getItems();
      setSnackMessage(intl.formatMessage({ id: 'item-successfully-deleted' }));
      setIsOpenSnack(true);
    } catch (e) {
      console.log('error');
    }
  };

  return (
    <>
      <div className="App">
        <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={items as ItemsRowsType[]}
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
        </div>
      </div>
      {isOpenDialog && (
        <CreateItem
          isOpenDialog={isOpenDialog}
          refreshView={() => {
            getItems();
            setSnackMessage(intl.formatMessage({ id: 'item-successfully-created' }));
            setIsOpenSnack(true);
          }}
          handleClick={() => setIsOpenDialog(false)}
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
    </>
  );
};
