// API Error Handler Utility
export const handleApiError = (error) => {
  console.error('API Error:', error);
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Network error: Unable to connect to server. Please check your internet connection.';
  }
  
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    switch (status) {
      case 401:
        return 'Authentication failed. Please login again.';
      case 403:
        return 'Access denied. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.response.data?.message || `Error ${status}: Something went wrong.`;
    }
  }
  
  return error.message || 'An unexpected error occurred.';
};

export const isNetworkError = (error) => {
  return error.name === 'TypeError' && error.message.includes('fetch');
};

export const isAuthError = (error) => {
  return error.response?.status === 401 || error.response?.status === 403;
}; 