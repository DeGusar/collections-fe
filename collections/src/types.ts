import { AlertColor, Theme } from '@mui/material';
import { Field } from './Pages/Collections/CreateCollection/AddAditionalFields/AddAditionalFields';

export type StateReducer = {
  isAuthorised: boolean;
  currentLocale: string;
  isDrawerSettings: boolean;
  isModalSearch: boolean;
  theme: Theme;
  userName: string | null;
};
export type ActionsType =
  | { type: 'setIsLogin'; payload: boolean }
  | { type: 'setLocale'; payload: string }
  | { type: 'setDrawerSettings'; payload: boolean }
  | { type: 'setTheme'; payload: Theme }
  | { type: 'setModalSearch' }
  | { type: 'setName'; payload: string };

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
  author?: string;
};

export type Additional = {
  [key: string]: string | boolean | Date | string[];
};

export type CardCollectionType = {
  nameCollection: string;
  description?: string;
  theme?: string;
  imageSrc?: string;
  additional: Additional[];
  createdAt: Date | string;
  userId?: string;
  author: string;
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

export type LikeType = {
  author: string;
};

export type ItemsRowsType = {
  _id: number;
  nameItem?: string;
  idCollection?: string;
  userId?: string;
  additional?: Additional[];
  tags?: string[];
  likes?: LikeType[];
};

export type ItemsDataType = {
  nameItem?: string;
  idCollection?: string;
  userId?: string;
  additional?: Additional[];
  tags?: string[];
  likes?: LikeType[];
  createdAt?: Date | string;
};

export type CreateItemProps = {
  isOpenDialog: boolean;
  handleClick: () => void;
  refreshView: () => void;
  idItem?: string;
};

export type EditItemProps = {
  isOpenDialog: boolean;
  handleClick: () => void;
  refreshView: () => void;
  idItem: string;
};

export type TagType = {
  _id: string;
  value: string;
};

export type DialogDeleteType = {
  isOpenDialog: boolean;
  handleDelete: () => void;
  setIsOpenDialog: () => void;
};

export interface StringMap {
  [key: string]: string;
}

export type CommentType = {
  value: string;
  postedAt: Date;
  author: string;
};
export type CommentPropsType = {
  comments: CommentType[];
  handleClick: () => void;
  isScroll: boolean;
};
