import { ROUTES } from './constants.js';

// Route Guard Functions
export const routeGuards = {
  // Check if user should be redirected after login
  shouldRedirectAfterLogin: (user) => {
    if (!user) return null;
    
    return user.role === 'ADMIN' ? ROUTES.ADMIN : ROUTES.HOME;
  },

  // Check if user can access admin routes
  canAccessAdmin: (user) => {
    return user?.role === 'ADMIN';
  },

  // Check if user can access student routes
  canAccessStudent: (user) => {
    return user?.role === 'STUDENT' || user?.role === 'ADMIN';
  },

  // Get default route for user role
  getDefaultRoute: (user) => {
    if (!user) return ROUTES.LOGIN;
    return user.role === 'ADMIN' ? ROUTES.ADMIN : ROUTES.HOME;
  },

  // Check if route requires authentication
  requiresAuth: (pathname) => {
    const publicRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
    return !publicRoutes.includes(pathname);
  },

  // Check if route requires admin role
  requiresAdmin: (pathname) => {
    const adminRoutes = [
      ROUTES.ADMIN,
      ROUTES.ADMIN_DASHBOARD,
      ROUTES.ADMIN_ADD_COURSE,
      ROUTES.ADMIN_EDIT_COURSE,
      ROUTES.ADMIN_MY_COURSES,
      ROUTES.ADMIN_ADD_USER,
      ROUTES.ADMIN_EDIT_USER,
      ROUTES.ADMIN_USERS,
      ROUTES.ADMIN_ENROLLMENTS,
    ];
    
    return adminRoutes.some(route => pathname.startsWith(route.replace('/:id', '')));
  },
};

// Navigation Guards
export const navigationGuards = {
  // Get available navigation items based on user role
  getNavigationItems: (user) => {
    if (!user) return [];
    
    if (user.role === 'ADMIN') {
      return [
        { path: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'chart-bar' },
        { path: ROUTES.ADMIN_USERS, label: 'Users', icon: 'users' },
        { path: ROUTES.ADMIN_ADD_COURSE, label: 'Add Course', icon: 'plus-circle' },
        { path: ROUTES.ADMIN_MY_COURSES, label: 'My Courses', icon: 'book-open' },
        { path: ROUTES.ADMIN_ENROLLMENTS, label: 'Enrollments', icon: 'user-graduate' },
      ];
    }
    
    return [
      { path: ROUTES.HOME, label: 'Home', icon: 'home' },
      { path: ROUTES.COURSES, label: 'Courses', icon: 'book' },
      { path: ROUTES.MY_ENROLLMENTS, label: 'My Enrollments', icon: 'graduation-cap' },
    ];
  },

  // Check if navigation item is active
  isActiveRoute: (currentPath, routePath) => {
    if (routePath.includes(':')) {
      // Handle dynamic routes
      const routeBase = routePath.split('/:')[0];
      return currentPath.startsWith(routeBase);
    }
    return currentPath === routePath;
  },
}; 