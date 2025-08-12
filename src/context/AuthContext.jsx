import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.ts';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          const currentUser = AuthService.getStoredUser();
          if (currentUser) {
            setUser(currentUser);
          } else {
            // Try to get current user from server
            try {
              const response = await AuthService.getCurrentUser();
              if (response.success) {
                setUser(response.data);
              } else {
                AuthService.logout();
              }
            } catch (serverError) {
              console.error('Server auth check failed:', serverError);
              AuthService.logout();
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function - simplified to just update context
  const login = async (token, userData) => {
    try {
      setError(null);
      setUser(userData);
      return { success: true, data: { token, user: userData } };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Register function - simplified to just update context
  const register = async (name, email, password, role = 'STUDENT') => {
    try {
      setError(null);
      const response = await AuthService.register({ name, email, password, role });
      if (response.success) {
        setUser(response.data.user);
      }
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setError(null);
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await AuthService.updateOwnProfile(profileData);
      if (response.success) {
        setUser(response.data);
      }
      
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return AuthService.isAuthenticated();
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'ADMIN';
  };

  // Check if user is student
  const isStudent = () => {
    return user?.role === 'STUDENT';
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Get redirect path based on user role
  const getRedirectPath = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin';
    return '/';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    isStudent,
    clearError,
    getRedirectPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 