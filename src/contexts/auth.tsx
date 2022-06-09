import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

interface Props {
  children: React.ReactNode
}

type User = {
  name: string
  username: string
}

interface AuthContextData {
  signed: boolean
  user:  User | null
  Login(): Promise<void>
  Logout(): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userStorage = localStorage.getItem('@App:user')
    const tokenStorage = localStorage.getItem('@App:token')

    if(tokenStorage && userStorage) {
      setUser(JSON.parse(userStorage))
      api.defaults.headers.Authorization = `Bearer ${tokenStorage}`
    }
  }, [])
  
  async function Login() {
    try {
      const response = await api.post('/users/login', {
        username: 'johndoe',
        password: 'password'
      })
      
      setUser(response.data.user)
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`

      localStorage.setItem('@App:user', JSON.stringify(response.data.user));
      localStorage.setItem('@App:token', response.data.token);
      
    } catch(error) {
      console.log('Incorrect credentials')
    }
  }
  
  async function Logout() {
    setUser(null);

    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('App:token');
  }
  
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export default AuthContext;
