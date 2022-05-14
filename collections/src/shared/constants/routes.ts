const routes = {
  HOME: '/',
  AUTHORISATION: '/login',
  COLLECTIONS_ROOT: '/collections',
  COLLECTIONS: '/collections/:userId',
  COLLECTION_CREATE: '/collections/:userId/create',
  COLLECTION_BY_ID: '/collections/:userId/:idCollection',
  COLLECTION_ITEM: 'item/:idItem',
  COLLECTION_EDIT: '/collections/:userId/edit/:idCollection',
  SEARCH_ROOT: '/search',
  SEARCH: '/search/:query',
  SEARCH_BY_TAG: '/search/tags/:tag',
  ADMIN: '/admin',
};

export default routes;
