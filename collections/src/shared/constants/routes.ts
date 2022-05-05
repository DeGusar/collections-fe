const routes = {
  HOME: '/',
  AUTHORISATION: '/login',
  COLLECTIONS_ROOT: '/collections',
  COLLECTIONS: '/collections/:userId',
  COLLECTION_CREATE: '/collections/:userId/create',
  COLLECTION_BY_ID: '/collections/:userId/:idCollection',
  COLLECTION_EDIT: '/collections/:userId/edit/:idCollection',
  ADMIN: '/admin',
};

export default routes;
