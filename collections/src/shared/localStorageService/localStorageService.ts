import { UserType } from '../../types';
import localStorageKeys from '../constants/localStorageKeys';

export function saveUserToLocalStorage(user: UserType) {
  localStorage.setItem(localStorageKeys.TOKEN, user.token);
  localStorage.setItem(localStorageKeys.USER_ID, user._id);
  localStorage.setItem(localStorageKeys.FIRST_NAME, user.firstName);
  localStorage.setItem(localStorageKeys.LAST_NAME, user.lastName);
}
