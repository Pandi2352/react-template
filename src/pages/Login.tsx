import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function Login() {
  return <Navigate to={ROUTES.DASHBOARD} replace />;
}
