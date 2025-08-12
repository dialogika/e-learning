import { Request } from 'express';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserRole = 'ADMIN' | 'STUDENT';

// Extended Request interface with user
export interface AuthenticatedRequest extends Request {
  user?: User;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  user: Omit<User, 'password'>;
  token: string;
}

// Course types
export interface CreateCourseRequest {
  title: string;
  description: string;
  image: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {}

// Course Structure types
export interface CreateCourseStructureRequest {
  title: string;
  lectures: number;
  duration: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
  courseId: string;
}

export interface UpdateCourseStructureRequest extends Partial<CreateCourseStructureRequest> {}

// User types
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  role?: UserRole;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  level?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 