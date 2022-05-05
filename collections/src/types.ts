import { AlertColor, Theme } from '@mui/material';
import { Field } from './Pages/Collections/CreateCollection/AddAditionalFields/AddAditionalFields';

export type StateReducer = {
  isAuthorised: boolean;
  currentLocale: string;
  isDrawerSettings: boolean;
  isModalSearch: boolean;
  theme: Theme;
};
export type ActionsType =
  | { type: 'setIsLogin'; payload: boolean }
  | { type: 'setLocale'; payload: string }
  | { type: 'setDrawerSettings'; payload: boolean }
  | { type: 'setTheme'; payload: Theme }
  | { type: 'setModalSearch' };

export type LoginDataType = {
  password: string;
  email: string;
};
export type RegistrationDataType = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export type UserType = {
  token: string;
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type SnackType = {
  isOpen: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  severityType?: AlertColor;
  message?: string;
};

export type UsersType = {
  _id: number;
  firstName: string;
  email: string;
  registration: Date;
  lastVisit: Date;
  status: string;
};

export type CollectionFormType = {
  nameCollection?: string;
  description?: string;
  theme?: string;
  imageSrc?: string;
  userId?: string | null;
  additional?: Field[];
  idCollection?: string;
};

type Additional = {
  type?: string;
  name?: string;
};

export type CardCollectionType = {
  nameCollection: string;
  description?: string;
  theme?: string;
  imageSrc?: string;
  additional?: Additional[];
  createdAt: Date | string;
  userId?: string;
  _id: string;
};

export type AdditionalFieldType = {
  type: string;
  name: string;
  value?: string | boolean | number | Date;
  field: string;
  headerName: string;
  flex: number;
};
