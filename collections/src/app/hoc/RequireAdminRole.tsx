import { Navigate } from 'react-router-dom';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import routes from '../../shared/constants/routes';
import { RequireAuthProp } from '../../types';

export const RequireAdminRole = ({ children }: RequireAuthProp) => {
  const role = localStorage.getItem(`${localStorageKeys.ROLE}`);

  if (!(role === 'admin')) {
    return <Navigate to={`${routes.HOME}`} />;
  }
  return children;
};
