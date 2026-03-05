import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function Register() {
  return <Navigate to={ROUTES.DASHBOARD} replace />;
}
