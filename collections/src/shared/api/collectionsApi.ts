import axios from 'axios';
import urls from '../constants/urls';
import { CollectionFormType } from '../../types';

export const createCollection = async (collectionData: CollectionFormType) => {
  return await axios.post(urls.COLLECTIONS.CREATE, { ...collectionData });
};

export const getCollectionsByIdUser = (idUser: string) => {
  return axios.get(`${urls.COLLECTIONS.ROOT}/${idUser}`);
};
export const getLatestCollections = () => {
  return axios.get(`${urls.COLLECTIONS.ROOT}`);
};

export const getCollectionByIdCollection = (idCollection: string) => {
  return axios.get(`${urls.COLLECTIONS.ROOT}/collection/${idCollection}`);
};

export const deleteCollectionById = (idCollection: string) => {
  return axios.delete(`${urls.COLLECTIONS.DELETE}/${idCollection}`);
};

export const updateCollection = (collectionData: CollectionFormType) => {
  return axios.patch(urls.COLLECTIONS.UPDATE, { ...collectionData });
};
