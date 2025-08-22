import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api.js"
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const login = (userData) => {
    setUser(userData);
    navigate('/');
  };


  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await api.profile();;
        setUser(response.data.data);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const value = { user, isLoading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};