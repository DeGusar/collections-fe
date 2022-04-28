import { locales } from '../../shared/constants/locales';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import { StateReducer } from '../../types';
import { ActionsType } from '../../types';

export const initialState = {
  isAuthorised: localStorage.getItem(localStorageKeys.TOKEN) ? true : false,
  currentLocale: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN,
};

export const reducer = (state: StateReducer, action: ActionsType) => {
  switch (action.type) {
    case 'setIsLogin':
      return {
        ...state,
        isAuthorised: action.payload,
      };
    case 'setLocale':
      return {
        ...state,
        currentLocale: action.payload,
      };
  }
};
