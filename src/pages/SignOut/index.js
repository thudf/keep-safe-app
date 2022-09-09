import { useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import PageLoader from '../../components/PageLoader';

const Home = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return <PageLoader />;
};

export default Home;