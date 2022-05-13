import axios from 'axios';
import urls from '../constants/urls';

export const searchByQuery = (query: string) => {
  return axios.get(`${urls.SEARCH}/${query}`);
};
