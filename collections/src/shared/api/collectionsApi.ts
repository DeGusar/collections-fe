import axios from 'axios';
import urls from '../constants/urls';
import { CollectionFormType } from '../../types';

export const createCollection = async (collectionData: CollectionFormType) => {
  return await axios.post(urls.COLLECTIONS.CREATE, { ...collectionData });
};

export const getCollectionsByIdUser = (idUser: string) => {
  return axios.get(`${urls.COLLECTIONS.ROOT}/${idUser}`);
};
