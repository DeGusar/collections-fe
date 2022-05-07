import axios from 'axios';
import urls from '../constants/urls';

export const getAllTags = async () => {
  return await axios.get(urls.TAGS.GETALL);
};
