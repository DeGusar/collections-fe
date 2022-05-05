/* const BASE_URL = 'https://itra-istore.herokuapp.com/'; */
const BASE_URL = 'http://localhost:5000/';

const urls = {
  AUTH: {
    ROOT: `${BASE_URL}auth`,
    LOGIN: `${BASE_URL}auth/login`,
    REGISTER: `${BASE_URL}auth/register`,
    USERS: `${BASE_URL}auth/users`,
    DELETE: `${BASE_URL}auth/delete`,
    BLOCK: `${BASE_URL}auth/block`,
    UNBLOCK: `${BASE_URL}auth/unblock`,
    SET_ADMIN: `${BASE_URL}auth/setadmin`,
  },
  COLLECTIONS: {
    ROOT: `${BASE_URL}collections`,
    CREATE: `${BASE_URL}collections/create`,
    DELETE: `${BASE_URL}collections/delete`,
  },
  IMAGES: {
    UPLOAD: `${BASE_URL}images/upload`,
  },
  ITEMS: {
    ROOT: `${BASE_URL}items`,
  },
  COMMENTS: {
    ROOT: `${BASE_URL}comments`,
  },
};

export default urls;
