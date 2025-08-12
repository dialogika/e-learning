/// <reference types="vite/client" />

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Types
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  createdById: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  structures?: CourseStructure[];
}

interface CourseStructure {
  id: string;
  courseId: string;
  title: string;
  lectures: number;
  duration: string;
  videoUrl: string;
  pdfUrl: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response from server');
    }
    throw error;
  }
};

// Helper function to get auth headers
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to build query string
const buildQueryString = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, value.toString());
    }
  });
  return queryParams.toString();
};

// Authentication API Service
class AuthService {
  // 1.1 Login User
  static async login(credentials: LoginRequest): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      const data = await handleResponse<{ token: string; user: User }>(response);
      
      // Store token and user data
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      throw error;
    }
  }

  // 1.2 Register
  static async register(userData: RegisterRequest, includeAuth: boolean = false): Promise<ApiResponse<{ token: string; user: User }>> {
    try {
      const headers = includeAuth ? getAuthHeaders() : { 'Content-Type': 'application/json' };
      
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify(userData)
      });
      
      const data = await handleResponse<{ token: string; user: User }>(response);
      
      // Store token and user data (for admin creating users, we might not want to auto-login)
      // So we'll only store if this is a self-registration
      if (data.data.token && data.data.user && !includeAuth) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server');
      }
      throw error;
    }
  }

  // 1.3 Get Current User Profile
  static async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<User>(response);
  }

  // 2.1 Get All Users (ADMIN ONLY)
  static async getAllUsers(params: { page?: number; limit?: number; search?: string } = {}): Promise<ApiResponse<{ data: User[]; pagination: any }>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ data: User[]; pagination: any }>(response);
  }

  // 2.2 Create User (ADMIN ONLY)
  static async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse<User>(response);
  }

  // 2.3 Update User (ADMIN ONLY)
  static async updateUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse<User>(response);
  }

  // 2.4 Update User Profile (ADMIN ONLY) - JSON version for non-file updates
  static async updateUserProfile(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse<User>(response);
  }

  // 2.5 Get User by ID (ADMIN ONLY)
  static async getUserById(userId: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<User>(response);
  }

  // 2.6 Get Own Profile
  static async getOwnProfile(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<User>(response);
  }

  // 2.7 Update User Password (ADMIN ONLY)
  static async updateUserPassword(userId: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ newPassword })
    });
    
    return handleResponse<{ message: string }>(response);
  }

  // 2.8 Update Own Profile
  static async updateOwnProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    
    return handleResponse<User>(response);
  }

  // 2.9 Delete User (ADMIN ONLY)
  static async deleteUser(userId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ message: string }>(response);
  }

  // 3.1 Get All Courses (AUTHENTICATED)
  static async getAllCourses(params: { page?: number; limit?: number; search?: string } = {}): Promise<ApiResponse<{ data: Course[]; pagination: any }>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/courses${queryString ? `?${queryString}` : ''}`;
    
    console.log('getAllCourses URL:', url);
    console.log('getAllCourses params:', params);
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ data: Course[]; pagination: any }>(response);
  }

  // 3.2 Get Course by ID (AUTHENTICATED)
  static async getCourseById(courseId: string): Promise<ApiResponse<Course>> {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<Course>(response);
  }

  // 3.3 Create Course (ADMIN ONLY)
  static async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Course>> {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    
    return handleResponse<Course>(response);
  }

  // 3.4 Update Course (ADMIN ONLY)
  static async updateCourse(courseId: string, courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    
    return handleResponse<Course>(response);
  }

  // 3.5 Delete Course (ADMIN ONLY)
  static async deleteCourse(courseId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ message: string }>(response);
  }

  // 3.6 Get Courses by Creator (AUTHENTICATED)
  static async getCoursesByCreator(userId: string, params: { page?: number; limit?: number } = {}): Promise<ApiResponse<{ data: Course[]; pagination: any }>> {
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}/courses/creator/${userId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ data: Course[]; pagination: any }>(response);
  }

  // 4.1 Get Course Structure by Course ID (ADMIN ONLY)
  static async getCourseStructureByCourseId(courseId: string): Promise<ApiResponse<CourseStructure[]>> {
    const response = await fetch(`${API_BASE_URL}/course-structures/course/${courseId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<CourseStructure[]>(response);
  }

  // 4.2 Get Course Structure by ID (ADMIN ONLY)
  static async getCourseStructureById(structureId: string): Promise<ApiResponse<CourseStructure>> {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse<CourseStructure>(response);
  }

  // 4.3 Create Course Structure (ADMIN ONLY)
  static async createCourseStructure(structureData: Omit<CourseStructure, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<CourseStructure>> {
    const response = await fetch(`${API_BASE_URL}/course-structures`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(structureData)
    });
    
    return handleResponse<CourseStructure>(response);
  }

  // 4.4 Update Course Structure (ADMIN ONLY)
  static async updateCourseStructure(structureId: string, structureData: Partial<CourseStructure>): Promise<ApiResponse<CourseStructure>> {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(structureData)
    });
    
    return handleResponse<CourseStructure>(response);
  }

  // 4.5 Delete Course Structure (ADMIN ONLY)
  static async deleteCourseStructure(structureId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${API_BASE_URL}/course-structures/${structureId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse<{ message: string }>(response);
  }

  // 4.6 Reorder Course Structures (ADMIN ONLY)
  static async reorderCourseStructures(courseId: string, structureIds: string[]): Promise<ApiResponse<{ message: string }>> {
    const response = await fetch(`${API_BASE_URL}/course-structures/reorder/${courseId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ structureIds })
    });
    
    return handleResponse<{ message: string }>(response);
  }

  // Utility methods
  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  static getStoredUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === 'ADMIN';
  }
}

export default AuthService;
export type {
  LoginRequest,
  RegisterRequest,
  User,
  Course,
  CourseStructure,
  ApiResponse,
  PaginatedResponse
}; 