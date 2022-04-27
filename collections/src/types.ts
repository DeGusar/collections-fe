export type StateReducer = {
  isAuthorised: boolean;
  currentLocale: string;
};
export type ActionsType =
  | { type: 'setIsLogin'; payload: boolean }
  | { type: 'setLocale'; payload: string };
