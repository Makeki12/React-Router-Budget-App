import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for token and fetch user data on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }, []);

  // Fetch user data using the token
  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me');
      setUser(res.data.user); // Set the user state
    } catch (error) {
      console.error('Failed to fetch user:', error.response?.data || error.message);
      logout(); // Logout if fetching user data fails
    } finally {
      setLoading(false); // Stop loading after fetching user data
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user); // Set the user state
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  // Login function
  const login = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData);
      console.log('Login response:', res.data); // Log the response
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user); // Set the user state
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null); // Clear user state
  };

  // Provide context values
  const value = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};