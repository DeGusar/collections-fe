import axios from 'axios';
import urls from '../constants/urls';
import localStorageKeys from '../constants/localStorageKeys';

export const uploadImage = async (base64EncodedImage: string) => {
  try {
    return await axios.post(`${urls.IMAGES.UPLOAD}`, { data: base64EncodedImage });
  } catch (err) {
    console.error(err);
  }
};
