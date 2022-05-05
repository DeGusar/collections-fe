import { GridValueFormatterParams } from '@mui/x-data-grid';
import date from 'date-and-time';
import { dateFormats } from '../../../shared/constants/dataFormats';
export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 0.5,
  },
  { field: 'name', headerName: 'Name', flex: 0.7 },
  { field: 'tags', headerName: 'Tags', flex: 1.2 },
];
