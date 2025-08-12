import React, { createContext, useContext, useState, useCallback } from 'react';
import Toast from '../components/common/Toast';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 5000
  });

  const showToast = useCallback((message, type = 'info', duration = 5000) => {
    setToast({
      message,
      type,
      isVisible: true,
      duration
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  const showSuccess = useCallback((message, duration = 5000) => {
    showToast(message, 'success', duration);
  }, [showToast]);

  const showError = useCallback((message, duration = 7000) => {
    showToast(message, 'error', duration);
  }, [showToast]);

  const showWarning = useCallback((message, duration = 6000) => {
    showToast(message, 'warning', duration);
  }, [showToast]);

  const showInfo = useCallback((message, duration = 5000) => {
    showToast(message, 'info', duration);
  }, [showToast]);

  const showApiResponse = useCallback((response, defaultMessage = 'Operation completed') => {
    if (response && response.success) {
      showSuccess(response.message || defaultMessage);
    } else if (response && response.message) {
      showError(response.message);
    } else {
      showError('An unexpected error occurred');
    }
  }, [showSuccess, showError]);

  const value = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showApiResponse,
    hideToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  );
}; 