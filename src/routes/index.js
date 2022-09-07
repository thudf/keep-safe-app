import React from 'react';

import { useAuth } from '../hooks/auth';

import PageLoader from '../components/PageLoader';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
