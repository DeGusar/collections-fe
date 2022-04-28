import axios from 'axios';
import { LoginDataType, RegistrationDataType } from '../../types';
import urls from '../constants/urls';
import localStorageKeys from '../constants/localStorageKeys';

export const login = (loginData: LoginDataType) => {
  return axios.post(urls.AUTH.LOGIN, { ...loginData });
};
export const registrateUser = (registrationData: RegistrationDataType) => {
  return axios.post(urls.AUTH.REGISTER, { ...registrationData });
};
export const getUsers = () => {
  return axios.get(urls.AUTH.USERS, {
    headers: {
      Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
    },
  });
};
export const blockUsers = (ids: string[]) => {
  return axios.patch(
    urls.AUTH.BLOCK,
    { ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
export const unblockUsers = (ids: string[]) => {
  return axios.patch(
    urls.AUTH.UNBLOCK,
    { ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
export const deleteUsers = (ids: string[]) => {
  return axios.delete(urls.AUTH.DELETE, {
    headers: {
      Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
    },
    data: { ids },
  });
};
export const setAdmin = (ids: string[]) => {
  return axios.patch(
    urls.AUTH.SET_ADMIN,
    { ids },
    {
      headers: {
        Authorization: `${localStorage.getItem(localStorageKeys.TOKEN)}`,
      },
    }
  );
};
