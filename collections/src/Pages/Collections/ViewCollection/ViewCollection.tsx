/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';
import { Box, Button, IconButton, LinearProgress } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { useParams } from 'react-router-dom';
import { AdditionalFieldType, ItemsRowsType } from '../../../types';
import { DataGrid, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { columns } from './columns';
import { capitalize } from '../../../shared/helpers/capitalize';
import AddIcon from '@mui/icons-material/Add';
import { CreateItem } from './CreateItem/CreateItem';
import { SnackCreate } from '../CreateCollection/Snack/Snack';
import { FormattedMessage, useIntl } from 'react-intl';
import { getItemByIdCollection } from '../../../shared/api/itemsApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ViewCollection = () => {
  const { state } = useContext(AppContext);
  const { userId, idCollection } = useParams();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [additionalField, setAdditional] = useState([] as AdditionalFieldType[]);
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
        flex: 0.4,
        renderCell: (params: GridRowParams) => {
          const onClickDelete = () => {
            console.log(params.row._id);
          };
          const onClickEdit = () => {
            console.log(params.row);
          };
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
    console.log(additionalField);
  }, [additionalField]);

  function EditToolbar() {
    return (
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'start', marginLeft: '30px' }}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setIsOpenDialog(true);
          }}
        >
          <FormattedMessage id="items-table-add-item" />
        </Button>
      </Box>
    );
  }

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
          refreshView={() => getItems()}
          handleClick={() => setIsOpenDialog(false)}
        />
      )}
      <SnackCreate
        isOpen={isOpenSnack}
        handleClose={() => setIsOpenSnack(false)}
        message={intl.formatMessage({ id: 'item-successfully-created' })}
      ></SnackCreate>
    </>
  );
};
