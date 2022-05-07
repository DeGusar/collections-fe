import { GridValueFormatterParams } from '@mui/x-data-grid';
import date from 'date-and-time';
import { dateFormats } from '../../../shared/constants/dataFormats';
export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
    headerAlign: 'left',
  },
  { field: 'nameItem', headerName: 'Name', flex: 1 },
  { field: 'tags', headerName: 'Tags', flex: 1.2 },
  {
    field: 'createdAt',
    headerName: 'Created',
    type: 'date',
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams<number>) => {
      const dateParams = new Date(params.value);
      return date.format(dateParams, `${dateFormats.TIME}`);
    },
  },
];
