import React from 'react';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';
import { useAuth } from '../contexts/auth';

const Paths: React.FC = () => {
  const { signed } = useAuth()
  return signed ? <OtherRoutes /> : <SignRoutes />
};

export default Paths;
