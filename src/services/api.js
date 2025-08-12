const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    if (error.name === 'SyntaxError') {
      throw new Error('Invalid JSON response from server');
    }
    throw error;
  }
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// API Service Class
class ApiService {
  // ========================================
  // 1. AUTHENTICATION ENDPOINTS
  // ========================================

  // 1.1 Login User
  static async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await handleResponse(response);
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      throw error;
    }
  }

  // 1.2 Register User (ADMIN ONLY)
  static async register(name, email, password, role = 'STUDENT') {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, email, password, role })
    });
    
    const data = await handleResponse(response);
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.user));
    return data;
  }

  // 1.3 Get Current User Profile
  static async getCurrentUser() {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // ========================================
  // 3. COURSE MANAGEMENT ENDPOINTS
  // ========================================

  // 3.1 Get All Courses (AUTHENTICATED)
  static async getCourses(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/courses${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 3.2 Get Course by ID (AUTHENTICATED)
  static async getCourseById(courseId) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 3.3 Create Course (ADMIN ONLY)
  static async createCourse(courseData) {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    
    return handleResponse(response);
  }

  // 3.4 Update Course (ADMIN ONLY)
  static async updateCourse(courseId, courseData) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    
    return handleResponse(response);
  }

  // 3.5 Delete Course (ADMIN ONLY)
  static async deleteCourse(courseId) {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 3.6 Get Courses by Creator (AUTHENTICATED)
  static async getCoursesByCreator(userId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/courses/creator/${userId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // ========================================
  // 2. USER MANAGEMENT ENDPOINTS
  // ========================================

  // 2.1 Get All Users (ADMIN ONLY)
  static async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 2.2 Get User by ID (ADMIN ONLY)
  static async getUserById(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 2.3 Get Own Profile
  static async getOwnProfile() {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 2.4 Update User Profile (ADMIN ONLY)
  static async updateUserProfile(userId, userData) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  }

  // 2.5 Update User Password (ADMIN ONLY)
  static async updateUserPassword(userId, newPassword) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword })
    });
    
    return handleResponse(response);
  }

  // 2.6 Update Own Profile
  static async updateOwnProfile(profileData) {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    
    return handleResponse(response);
  }

  // 2.7 Delete User (ADMIN ONLY)
  static async deleteUser(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 2.8 Create User (ADMIN ONLY)
  static async createUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  }

  // 2.9 Update User (ADMIN ONLY)
  static async updateUser(userId, userData) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  }

  // ========================================
  // 4. COURSE STRUCTURE ENDPOINTS
  // ========================================

  // 4.1 Get Course Structure by Course ID (ADMIN ONLY)
  static async getCourseStructuresByCourseId(courseId) {
    const response = await fetch(`${API_BASE_URL}/course-structures/course/${courseId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 4.2 Get Course Structure by ID (ADMIN ONLY)
  static async getCourseStructureById(structureId) {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 4.3 Create Course Structure (ADMIN ONLY)
  static async createCourseStructure(structureData) {
    const response = await fetch(`${API_BASE_URL}/course-structures`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(structureData)
    });
    
    return handleResponse(response);
  }

  // 4.4 Update Course Structure (ADMIN ONLY)
  static async updateCourseStructure(structureId, structureData) {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(structureData)
    });
    
    return handleResponse(response);
  }

  // 4.5 Delete Course Structure (ADMIN ONLY)
  static async deleteCourseStructure(structureId) {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }

  // 4.6 Reorder Course Structures (ADMIN ONLY)
  static async reorderCourseStructures(courseId, structureIds) {
    const response = await fetch(`${API_BASE_URL}/course-structures/reorder/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ structureIds })
    });
    
    return handleResponse(response);
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static getToken() {
    return localStorage.getItem('token');
  }
}

export default ApiService; 