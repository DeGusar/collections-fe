import axios from 'axios';
import { LoginDataType, RegistrationDataType } from '../../types';
import urls from '../constants/urls';
import localStorageKeys from '../constants/localStorageKeys';

export const login = (loginData: LoginDataType) => {
  axios.post(urls.AUTH.LOGIN, { body: loginData });
};
export const registrateUser = (registrationData: RegistrationDataType) => {
  return axios.post(urls.AUTH.REGISTER, { ...registrationData });
};
export const getUsers = () => {
  axios.get(urls.AUTH.USERS, {
    headers: {
      Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
    },
  });
};
export const blockUsers = (ids: string[]) => {
  axios.patch(
    urls.AUTH.BLOCK,
    { body: ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
export const unblockUsers = (ids: string[]) => {
  axios.patch(
    urls.AUTH.UNBLOCK,
    { body: ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
export const deleteUsers = (ids: string[]) => {
  axios.patch(
    urls.AUTH.DELETE,
    { body: ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
export const setAdmin = (ids: string[]) => {
  axios.patch(
    urls.AUTH.SET_ADMIN,
    { body: ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
