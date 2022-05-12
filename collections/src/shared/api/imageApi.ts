import axios from 'axios';
import urls from '../constants/urls';

export const uploadImage = (base64EncodedImage: string) => {
  try {
    return axios.post(`${urls.IMAGES.UPLOAD}`, { data: base64EncodedImage });
  } catch (err) {
    console.error(err);
  }
};
