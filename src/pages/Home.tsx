import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

export function Home() {
  return <Navigate to={ROUTES.DASHBOARD} replace />;
}
