import axios from 'axios';
import urls from '../constants/urls';

export const getAllTags = () => {
  return axios.get(urls.TAGS.GETALL);
};
export const tagByIdItem = (idItem: string) => {
  return axios.get(`${urls.TAGS.ROOT}/${idItem}`);
};

export const deleteTagById = (idItem: string, value: string) => {
  return axios.delete(`${urls.TAGS.DELETE}/${idItem}`, {
    data: { value },
  });
};
