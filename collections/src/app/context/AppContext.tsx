import { createContext, Dispatch } from 'react';
import { initialState } from './Reducer';
import { ActionsType, StateReducer } from '../../types';

export const AppContext = createContext<{ state: StateReducer; dispatch: Dispatch<ActionsType> }>({
  state: initialState,
  dispatch: () => null,
});
