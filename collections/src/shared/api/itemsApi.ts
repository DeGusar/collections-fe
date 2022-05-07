import axios from 'axios';
import { ItemsDataType } from '../../types';
import urls from '../constants/urls';

export const createItem = async (itemsData: ItemsDataType) => {
  return await axios.post(urls.ITEMS.CREATE, { ...itemsData });
};
