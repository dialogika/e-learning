# AuthService Documentation

This document describes the `AuthService` class that provides a comprehensive interface to all backend API endpoints for the LMS system.

## Overview

The `AuthService` is a TypeScript class that handles all API communication with the backend, including:
- Authentication (login, register, profile management)
- User management (CRUD operations for users)
- Course management (CRUD operations for courses)
- Course structure management (CRUD operations for course content)

## Installation & Setup

The service is already configured to use the environment variable `VITE_API_BASE_URL` or defaults to `/api` (which is proxied to `http://localhost:3000/api` in development).

```typescript
import AuthService from './services/auth';
```

## Authentication Endpoints

### 1. Login User
```typescript
const response = await AuthService.login({
  email: 'admin@example.com',
  password: 'admin123'
});
```

### 2. Register User (Admin Only)
```typescript
const response = await AuthService.register({
  name: 'New User',
  email: 'newuser@example.com',
  password: 'password123',
  role: 'STUDENT'
});
```

### 3. Get Current User Profile
```typescript
const response = await AuthService.getCurrentUser();
```

## User Management Endpoints

### 1. Get All Users (Admin Only)
```typescript
const response = await AuthService.getAllUsers({
  page: 1,
  limit: 10,
  search: 'john'
});
```

### 2. Get User by ID (Admin Only)
```typescript
const response = await AuthService.getUserById('user-id');
```

### 3. Get Own Profile
```typescript
const response = await AuthService.getOwnProfile();
```

### 4. Update User Profile (Admin Only)
```typescript
const response = await AuthService.updateUserProfile('user-id', {
  name: 'Updated Name',
  email: 'updated@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'ADMIN'
});
```

### 5. Update User Password (Admin Only)
```typescript
const response = await AuthService.updateUserPassword('user-id', 'newpassword123');
```

### 6. Update Own Profile
```typescript
const response = await AuthService.updateOwnProfile({
  name: 'My Updated Name',
  email: 'my.updated@example.com',
  avatar: 'https://example.com/my-avatar.jpg'
});
```

### 7. Delete User (Admin Only)
```typescript
const response = await AuthService.deleteUser('user-id');
```

## Course Management Endpoints

### 1. Get All Courses (Authenticated)
```typescript
const response = await AuthService.getAllCourses({
  page: 1,
  limit: 10,
  search: 'javascript'
});
```

### 2. Get Course by ID (Authenticated)
```typescript
const response = await AuthService.getCourseById('course-id');
```

### 3. Create Course (Admin Only)
```typescript
const response = await AuthService.createCourse({
  title: 'JavaScript Fundamentals',
  description: 'Learn JavaScript from scratch',
  thumbnail: 'https://example.com/js-thumbnail.jpg',
  price: 99.99,
  category: 'Programming',
  level: 'Beginner',
  duration: '10 hours',
  creatorId: 'user-id'
});
```

### 4. Update Course (Admin Only)
```typescript
const response = await AuthService.updateCourse('course-id', {
  title: 'Updated JavaScript Course',
  description: 'Updated description',
  price: 149.99
});
```

### 5. Delete Course (Admin Only)
```typescript
const response = await AuthService.deleteCourse('course-id');
```

### 6. Get Courses by Creator (Authenticated)
```typescript
const response = await AuthService.getCoursesByCreator('user-id', {
  page: 1,
  limit: 10
});
```

## Course Structure Endpoints

### 1. Get Course Structure by Course ID (Admin Only)
```typescript
const response = await AuthService.getCourseStructureByCourseId('course-id');
```

### 2. Get Course Structure by ID (Admin Only)
```typescript
const response = await AuthService.getCourseStructureById('structure-id');
```

### 3. Create Course Structure (Admin Only)
```typescript
const response = await AuthService.createCourseStructure({
  courseId: 'course-id',
  title: 'Introduction to JavaScript',
  description: 'Learn the basics of JavaScript',
  type: 'VIDEO',
  content: 'https://example.com/video.mp4',
  duration: 30,
  order: 1
});
```

### 4. Update Course Structure (Admin Only)
```typescript
const response = await AuthService.updateCourseStructure('structure-id', {
  title: 'Updated JavaScript Introduction',
  description: 'Updated description',
  duration: 45
});
```

### 5. Delete Course Structure (Admin Only)
```typescript
const response = await AuthService.deleteCourseStructure('structure-id');
```

### 6. Reorder Course Structures (Admin Only)
```typescript
const response = await AuthService.reorderCourseStructures('course-id', [
  'structure-id-1',
  'structure-id-2',
  'structure-id-3'
]);
```

## Utility Methods

### Check Authentication Status
```typescript
const isAuthenticated = AuthService.isAuthenticated();
```

### Get Current User from Storage
```typescript
const user = AuthService.getCurrentUser();
```

### Check Admin Status
```typescript
const isAdmin = AuthService.isAdmin();
```

### Get Token
```typescript
const token = AuthService.getToken();
```

### Logout
```typescript
AuthService.logout();
```

## Response Types

All API methods return typed responses:

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}
```

## Error Handling

All methods include proper error handling and will throw errors for:
- Network issues
- Invalid responses
- HTTP errors
- Authentication failures

```typescript
try {
  const response = await AuthService.login(credentials);
  console.log('Success:', response.data);
} catch (error) {
  console.error('Error:', error.message);
}
```

## TypeScript Support

The service includes full TypeScript support with interfaces for:
- `LoginRequest`
- `RegisterRequest`
- `User`
- `Course`
- `CourseStructure`
- `ApiResponse<T>`
- `PaginatedResponse<T>`

## Examples

See `auth-examples.ts` for comprehensive usage examples of all endpoints.

## Migration from api.js

If you're migrating from the existing `api.js` file:

1. Replace imports:
   ```typescript
   // Old
   import ApiService from './services/api';
   
   // New
   import AuthService from './services/auth';
   ```

2. Update method calls:
   ```typescript
   // Old
   const response = await ApiService.login(email, password);
   
   // New
   const response = await AuthService.login({ email, password });
   ```

3. The new service provides better TypeScript support and matches the exact backend API structure. 