// Debug utility for development
export const debug = {
  log: (message, data = null) => {
    if (import.meta.env.DEV) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },
  
  error: (message, error = null) => {
    if (import.meta.env.DEV) {
      console.error(`[DEBUG ERROR] ${message}`, error);
    }
  },
  
  warn: (message, data = null) => {
    if (import.meta.env.DEV) {
      console.warn(`[DEBUG WARN] ${message}`, data);
    }
  },
  
  api: (endpoint, method, data = null) => {
    if (import.meta.env.DEV) {
      console.log(`[API] ${method} ${endpoint}`, data);
    }
  },
  
  auth: (action, data = null) => {
    if (import.meta.env.DEV) {
      console.log(`[AUTH] ${action}`, data);
    }
  }
};

// Check if we're in development mode
export const isDev = import.meta.env.DEV;

// Check if we're in production mode
export const isProd = import.meta.env.PROD; 