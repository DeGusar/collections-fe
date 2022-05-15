import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { RequireAuthProp } from '../../types';
import { AppContext } from '../context/AppContext';

export const RequireAuth = ({ children }: RequireAuthProp) => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  if (!state.isAuthorised) {
    return <Navigate to={`${routes.AUTHORISATION}`} />;
  }
  return children;
};
