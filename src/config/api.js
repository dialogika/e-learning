// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Environment check
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  USERS: {
    ALL: '/users',
    BY_ID: (id) => `/users/${id}`,
    PROFILE: '/users/profile',
    PASSWORD: (id) => `/users/${id}/password`,
  },
  COURSES: {
    ALL: '/courses',
    BY_ID: (id) => `/courses/${id}`,
    BY_CREATOR: (id) => `/courses/creator/${id}`,
  },
  COURSE_STRUCTURES: {
    BY_COURSE: (id) => `/course-structures/course/${id}`,
    BY_ID: (id) => `/course-structures/${id}`,
    REORDER: (id) => `/course-structures/reorder/${id}`,
  },
}; 