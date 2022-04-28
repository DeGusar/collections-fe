import { AlertColor } from '@mui/material';

export type StateReducer = {
  isAuthorised: boolean;
  currentLocale: string;
};
export type ActionsType =
  | { type: 'setIsLogin'; payload: boolean }
  | { type: 'setLocale'; payload: string };

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
  severityType: AlertColor;
  message: string;
};

export type UsersType = {
  _id: number;
  firstName: string;
  email: string;
  registration: Date;
  lastVisit: Date;
  status: string;
};
