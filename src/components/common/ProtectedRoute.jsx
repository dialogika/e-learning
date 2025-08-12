import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Loading from './Loading.jsx';
import { routeGuards } from '../../routes/guards.js';
import { ROUTES } from '../../routes/constants.js';

const ProtectedRoute = ({ children, requireAuth = true, requireAdmin = false, requireStudent = false }) => {
  const { user, isAuthenticated, isAdmin, isStudent, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  // If student access is required but user is not student
  if (requireStudent && !isStudent) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  // If user is authenticated but trying to access login/register pages
  if (isAuthenticated && (location.pathname === ROUTES.LOGIN || location.pathname === ROUTES.SIGNUP)) {
    const redirectPath = routeGuards.shouldRedirectAfterLogin(user);
    if (redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 