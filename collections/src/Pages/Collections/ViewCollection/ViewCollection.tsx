import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../app/context/AppContext';
import { useStyles } from './styles';
import { Container, LinearProgress } from '@mui/material';
import { getCollectionByIdCollection } from '../../../shared/api/collectionsApi';
import { useParams } from 'react-router-dom';
import { AdditionalFieldType } from '../../../types';
import { ControlBar } from '../../AdminPanel/ControlsBar/ControlsBar';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './columns';
import { capitalize } from '../../../shared/helpers/capitalize';

export const ViewCollection = () => {
  const { state } = useContext(AppContext);

  const [additionalField, setAdditional] = useState([] as AdditionalFieldType[]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([] as string[]);
  const classes = useStyles(state.theme);
  const { userId, idCollection } = useParams();

  const getCollection = async () => {
    const { data } = await getCollectionByIdCollection(idCollection as string);
    const { additional } = data[0];

    const add = additional.map((addField: AdditionalFieldType) => {
      return {
        field: addField.name,
        headerName: capitalize(addField.name),
        flex: 1,
        type:
          addField.type === 'Date'
            ? 'date'
            : addField.type === 'Number'
            ? 'number'
            : addField.type === 'Checkbox'
            ? 'boolean'
            : 'string',
      };
    });
    setAdditional(add);
  };

  useEffect(() => {
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div style={{ height: '70vh', width: '100%', marginTop: '20px' }}>
        <DataGrid
          rows={items}
          columns={columns.concat(additionalField)}
          components={{
            LoadingOverlay: LinearProgress,
          }}
          loading={isLoading}
          pageSize={10}
          autoHeight={true}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(itm) => {
            const checked = itm.toString().split(',');
            setSelectedIds(checked);
          }}
        />
      </div>
    </div>
  );
};
