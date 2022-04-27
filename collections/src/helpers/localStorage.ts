export function saveToLocalStorage(token: string) {
  localStorage.setItem('token', token);
}

export function getFromLocalStorage() {
  return localStorage.getItem('token');
}
