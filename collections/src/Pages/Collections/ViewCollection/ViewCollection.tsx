/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';
import { Button, LinearProgress } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { useParams } from 'react-router-dom';
import { AdditionalFieldType } from '../../../types';
import { DataGrid, GridApi, GridToolbarContainer } from '@mui/x-data-grid';
import { columns } from './columns';
import { capitalize } from '../../../shared/helpers/capitalize';
import AddIcon from '@mui/icons-material/Add';
import { CreateItem } from './CreateItem/CreateItem';
import { SnackCreate } from '../CreateCollection/Snack/Snack';
import { useIntl } from 'react-intl';

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

  const [columnsGrid, setColumnsGrid] = useState(columns as AdditionalFieldType[]);

  const getCollection = async () => {
    const { data } = await getCollectionByIdCollection(idCollection as string);
    const { additional } = data[0];

    const add = additional.map((addField: AdditionalFieldType) => {
      return {
        field: addField.name,
        headerName: capitalize(addField.name),
        flex: addField.type === 'boolean' ? 0.3 : 1,
        type: addField.type === 'text' ? 'string' : addField.type,
      };
    });
    setAdditional(
      add.concat({
        field: ' ',
        flex: 0.3,
        renderCell: renderButton,
        disableClickEventBubbling: true,
      })
    );
  };

  function EditToolbar() {
    return (
      <Button
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          setIsOpenDialog(true);
        }}
      >
        Add record
      </Button>
    );
  }

  const renderButton = () => {
    <Button variant="contained" color="primary" size="small">
      More Info
    </Button>;
  };

  useEffect(() => {
    getCollection();
  }, []);
  useEffect(() => {
    setColumnsGrid((prevColumns) => prevColumns.concat(additionalField));
  }, [additionalField]);

  return (
    <>
      <div className="App">
        <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
          <DataGrid
            rows={items}
            columns={columnsGrid}
            components={{
              LoadingOverlay: LinearProgress,
              Toolbar: EditToolbar,
            }}
            loading={isLoading}
            pageSize={10}
            autoHeight={true}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
          />
        </div>
      </div>
      {isOpenDialog && (
        <CreateItem isOpenDialog={isOpenDialog} handleClick={() => setIsOpenDialog(false)} />
      )}
      <SnackCreate
        isOpen={isOpenSnack}
        handleClose={() => setIsOpenSnack(false)}
        message={intl.formatMessage({ id: 'item-successfully-created' })}
      ></SnackCreate>
    </>
  );
};
