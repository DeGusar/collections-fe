import axios from 'axios';
import { ItemsDataType } from '../../types';
import urls from '../constants/urls';

export const createItem = (itemsData: ItemsDataType) => {
  return axios.post(urls.ITEMS.CREATE, { ...itemsData });
};
export const getItemByIdCollection = (idCollection: string) => {
  return axios.get(`${urls.ITEMS.GET_BY_ID_COLLECTION}/${idCollection}`);
};
export const getItemByIdItem = (idItem: string) => {
  return axios.get(`${urls.ITEMS.ROOT}/${idItem}`);
};

export const deleteItemById = (idItem: string) => {
  return axios.delete(`${urls.ITEMS.DELETE}/${idItem}`);
};
export const updateItem = (idItem: string, itemData: ItemsDataType) => {
  return axios.patch(`${urls.ITEMS.UPDATE}/${idItem}`, { ...itemData });
};
