import { locales } from '../../shared/constants/locales';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import { StateReducer } from '../../types';
import { ActionsType } from '../../types';
import { lightTheme } from '../themes/lightTheme';
import { darkTheme } from '../themes/darkTheme';

export const initialState = {
  isAuthorised: localStorage.getItem(localStorageKeys.TOKEN) ? true : false,
  currentLocale: localStorage.getItem(localStorageKeys.LOCALE) || locales.EN,
  isDrawerSettings: false,
  theme: localStorage.getItem(localStorageKeys.THEME) === 'light' ? lightTheme : darkTheme,
  isModalSearch: false,
  userName: localStorage.getItem(localStorageKeys.NAME) ?? '',
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
    case 'setDrawerSettings':
      return {
        ...state,
        isDrawerSettings: action.payload,
      };
    case 'setTheme':
      return {
        ...state,
        theme: action.payload,
      };
    case 'setModalSearch':
      return {
        ...state,
        isModalSearch: !state.isModalSearch,
      };
    case 'setName':
      return {
        ...state,
        userName: action.payload,
      };
  }
};
