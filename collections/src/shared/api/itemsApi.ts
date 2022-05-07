import axios from 'axios';
import { ItemsDataType } from '../../types';
import urls from '../constants/urls';

export const createItem = async (itemsData: ItemsDataType) => {
  return await axios.post(urls.ITEMS.CREATE, { ...itemsData });
};
export const getItemByIdCollection = async (idCollection: string) => {
  return await axios.get(`${urls.ITEMS.GET_BY_ID_COLLECTION}/${idCollection}`);
};

export const deleteItemById = async (idItem: string) => {
  return axios.delete(`${urls.ITEMS.DELETE}/${idItem}`);
};
