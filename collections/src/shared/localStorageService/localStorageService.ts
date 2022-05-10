import { UserType } from '../../types';
import localStorageKeys from '../constants/localStorageKeys';

export function saveUserToLocalStorage(user: UserType) {
  localStorage.setItem(localStorageKeys.TOKEN, user.token);
  localStorage.setItem(localStorageKeys.USER_ID, user._id);
  localStorage.setItem(localStorageKeys.NAME, `${user.firstName} ${user.lastName}`);
  localStorage.setItem(localStorageKeys.ROLE, user.role);
}

export function deleteUserFromLocalStorage() {
  localStorage.removeItem(localStorageKeys.TOKEN);
  localStorage.removeItem(localStorageKeys.USER_ID);
  localStorage.removeItem(localStorageKeys.NAME);
  localStorage.removeItem(localStorageKeys.ROLE);
}
