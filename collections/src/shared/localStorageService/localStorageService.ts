import { UserType } from '../../types';
import localStorageKeys from '../constants/localStorageKeys';

export function saveUserToLocalStorage(user: UserType) {
  localStorage.setItem(localStorageKeys.TOKEN, user.token);
  localStorage.setItem(localStorageKeys.USER_ID, user._id);
  localStorage.setItem(localStorageKeys.FIRST_NAME, user.firstName);
  localStorage.setItem(localStorageKeys.LAST_NAME, user.lastName);
  localStorage.setItem(localStorageKeys.ROLE, user.role);
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem(localStorageKeys.TOKEN);
  localStorage.removeItem(localStorageKeys.USER_ID);
  localStorage.removeItem(localStorageKeys.FIRST_NAME);
  localStorage.removeItem(localStorageKeys.LAST_NAME);
  localStorage.removeItem(localStorageKeys.ROLE);
}
