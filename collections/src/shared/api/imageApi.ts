import axios from 'axios';
import urls from '../constants/urls';
import localStorageKeys from '../constants/localStorageKeys';

export const uploadImage = (base64EncodedImage: string) => {
  try {
    return axios.post(`${urls.IMAGES.UPLOAD}`, { data: base64EncodedImage });
  } catch (err) {
    console.error(err);
  }
};
