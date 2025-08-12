// Route Constants
export const ROUTES = {
  // Public Routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  
  // Student Routes
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  MY_ENROLLMENTS: '/my-enrollments',
  PLAYER: '/player/:courseId/:structureId',
  
  // Admin Routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ADD_COURSE: '/admin/add-course',
  ADMIN_EDIT_COURSE: '/admin/edit-course/:id',
  ADMIN_MY_COURSES: '/admin/my-courses',
  ADMIN_ADD_USER: '/admin/add-user',
  ADMIN_EDIT_USER: '/admin/edit-user/:id',
  ADMIN_USERS: '/admin/users',
  ADMIN_ENROLLMENTS: '/admin/enrollments',
  
  // Error Routes
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',
};

// Route Groups
export const ROUTE_GROUPS = {
  PUBLIC: [ROUTES.LOGIN, ROUTES.SIGNUP],
  STUDENT: [ROUTES.HOME, ROUTES.COURSES, ROUTES.COURSE_DETAILS, ROUTES.MY_ENROLLMENTS, ROUTES.PLAYER],
  ADMIN: [
    ROUTES.ADMIN, 
    ROUTES.ADMIN_DASHBOARD, 
    ROUTES.ADMIN_ADD_COURSE, 
    ROUTES.ADMIN_EDIT_COURSE, 
    ROUTES.ADMIN_MY_COURSES, 
    ROUTES.ADMIN_ADD_USER, 
    ROUTES.ADMIN_EDIT_USER, 
    ROUTES.ADMIN_USERS, 
    ROUTES.ADMIN_ENROLLMENTS
  ],
  ERROR: [ROUTES.UNAUTHORIZED, ROUTES.NOT_FOUND],
};

// Navigation Menu Items
export const NAVIGATION = {
  STUDENT: [
    { path: ROUTES.HOME, label: 'Home', icon: 'home' },
    { path: ROUTES.COURSES, label: 'Courses', icon: 'book' },
    { path: ROUTES.MY_ENROLLMENTS, label: 'My Enrollments', icon: 'graduation-cap' },
  ],
  ADMIN: [
    { path: ROUTES.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'chart-bar' },
    { path: ROUTES.ADMIN_USERS, label: 'Users', icon: 'users' },
    { path: ROUTES.ADMIN_ADD_COURSE, label: 'Add Course', icon: 'plus-circle' },
    { path: ROUTES.ADMIN_MY_COURSES, label: 'My Courses', icon: 'book-open' },
    { path: ROUTES.ADMIN_ENROLLMENTS, label: 'Enrollments', icon: 'user-graduate' },
  ],
}; 