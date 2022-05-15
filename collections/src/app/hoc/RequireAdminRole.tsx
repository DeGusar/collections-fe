import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import localStorageKeys from '../../shared/constants/localStorageKeys';
import routes from '../../shared/constants/routes';
import { RequireAuthProp } from '../../types';
import { AppContext } from '../context/AppContext';

export const RequireAdminRole = ({ children }: RequireAuthProp) => {
  const role = localStorage.getItem(`${localStorageKeys.ROLE}`);
  const navigate = useNavigate();

  if (!(role === 'admin')) {
    return <Navigate to={`${routes.HOME}`} />;
  }
  return children;
};
