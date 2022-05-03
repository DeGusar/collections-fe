import axios from 'axios';
import urls from '../constants/urls';
import localStorageKeys from '../constants/localStorageKeys';
import { CollectionFormType } from '../../types';

export const createCollection = async (collectionData: CollectionFormType) => {
  return await axios.post(urls.COLLECTIONS.CREATE, { ...collectionData });
};
