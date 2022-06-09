import React from 'react';
import { useAuth } from '../../contexts/auth';

const Home: React.FC = () => {
  const { Logout, user } = useAuth();

  async function handleLogout() {
    Logout();
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>{`Bem vindo(a) ${user?.name}`}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
 );
};

export default Home;
