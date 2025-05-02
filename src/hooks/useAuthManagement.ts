
import { useState } from 'react';
import { DEFAULT_PASSWORD } from '@/context/adminDefaults';

export const useAuthManagement = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (password: string): boolean => {
    // In a real application, you'd want to use a more secure authentication method
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout
  };
};
