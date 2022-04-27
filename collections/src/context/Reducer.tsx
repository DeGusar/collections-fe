import { StateReducer } from '../types';
import { ActionsType } from '../types';
import { getFromLocalStorage } from '../helpers/localStorage';

export const initialState = {
  isAuthorised: getFromLocalStorage() ? true : false,
};

export const reducer = (state: StateReducer, action: ActionsType) => {
  switch (action.type) {
    case 'setIsLogin':
      return {
        ...state,
        isAuthorised: action.payload,
      };
  }
};
