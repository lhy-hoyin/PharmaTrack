import React, { createContext, useState, useContext } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [isAuthenticated, setIsAuthenticated] = useState(!!cookies.user);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie('user');
    setIsAuthenticated(false);
  };

  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    </CookiesProvider>
  );
};

export const useAuth = () => useContext(AuthContext);