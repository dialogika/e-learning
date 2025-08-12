// import AuthService from './auth';
// import type { LoginRequest, RegisterRequest, User, Course, CourseStructure } from './auth';

// // Example usage of AuthService

// // 1. AUTHENTICATION EXAMPLES
// export const authenticationExamples = {
//   // Login user
//   async loginExample() {
//     try {
//       const credentials: LoginRequest = {
//         email: 'admin@example.com',
//         password: 'admin123'
//       };
      
//       const response = await AuthService.login(credentials);
//       console.log('Login successful:', response.data.user);
//       return response;
//     } catch (error) {
//       console.error('Login failed:', error);
//       throw error;
//     }
//   },

//   // Register new user (Admin only)
//   async registerExample() {
//     try {
//       const userData: RegisterRequest = {
//         name: 'New User',
//         email: 'newuser@example.com',
//         password: 'password123',
//         role: 'STUDENT'
//       };
      
//       const response = await AuthService.register(userData);
//       console.log('Registration successful:', response.data.user);
//       return response;
//     } catch (error) {
//       console.error('Registration failed:', error);
//       throw error;
//     }
//   },

//   // Get current user profile
//   async getCurrentUserExample() {
//     try {
//       const response = await AuthService.getCurrentUser();
//       console.log('Current user:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to get current user:', error);
//       throw error;
//     }
//   }
// };

// // 2. USER MANAGEMENT EXAMPLES
// export const userManagementExamples = {
//   // Get all users (Admin only)
//   async getAllUsersExample() {
//     try {
//       const response = await AuthService.getAllUsers({
//         page: 1,
//         limit: 10,
//         search: 'john'
//       });
//       console.log('Users:', response.data.data);
//       console.log('Pagination:', response.data.pagination);
//       return response;
//     } catch (error) {
//       console.error('Failed to get users:', error);
//       throw error;
//     }
//   },

//   // Get user by ID (Admin only)
//   async getUserByIdExample(userId: string) {
//     try {
//       const response = await AuthService.getUserById(userId);
//       console.log('User details:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to get user:', error);
//       throw error;
//     }
//   },

//   // Update user profile (Admin only)
//   async updateUserProfileExample(userId: string) {
//     try {
//       const userData: Partial<User> = {
//         name: 'Updated Name',
//         email: 'updated@example.com',
//         avatar: 'https://example.com/avatar.jpg',
//         role: 'ADMIN'
//       };
      
//       const response = await AuthService.updateUserProfile(userId, userData);
//       console.log('User updated:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to update user:', error);
//       throw error;
//     }
//   },

//   // Update own profile
//   async updateOwnProfileExample() {
//     try {
//       const userData: Partial<User> = {
//         name: 'My Updated Name',
//         email: 'my.updated@example.com',
//         avatar: 'https://example.com/my-avatar.jpg'
//       };
      
//       const response = await AuthService.updateOwnProfile(userData);
//       console.log('Profile updated:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to update profile:', error);
//       throw error;
//     }
//   },

//   // Delete user (Admin only)
//   async deleteUserExample(userId: string) {
//     try {
//       const response = await AuthService.deleteUser(userId);
//       console.log('User deleted:', response.data.message);
//       return response;
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//       throw error;
//     }
//   }
// };

// // 3. COURSE MANAGEMENT EXAMPLES
// export const courseManagementExamples = {
//   // Get all courses
//   async getAllCoursesExample() {
//     try {
//       const response = await AuthService.getAllCourses({
//         page: 1,
//         limit: 10,
//         search: 'javascript'
//       });
//       console.log('Courses:', response.data.items);
//       console.log('Pagination:', response.data.pagination);
//       return response;
//     } catch (error) {
//       console.error('Failed to get courses:', error);
//       throw error;
//     }
//   },

//   // Get course by ID
//   async getCourseByIdExample(courseId: string) {
//     try {
//       const response = await AuthService.getCourseById(courseId);
//       console.log('Course details:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to get course:', error);
//       throw error;
//     }
//   },

//   // Create course (Admin only)
//   async createCourseExample() {
//     try {
//       const courseData = {
//         title: 'JavaScript Fundamentals',
//         description: 'Learn JavaScript from scratch',
//         thumbnail: 'https://example.com/js-thumbnail.jpg',
//         price: 99.99,
//         category: 'Programming',
//         level: 'Beginner',
//         duration: '10 hours',
//         creatorId: 'user-id-here'
//       };
      
//       const response = await AuthService.createCourse(courseData);
//       console.log('Course created:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to create course:', error);
//       throw error;
//     }
//   },

//   // Update course (Admin only)
//   async updateCourseExample(courseId: string) {
//     try {
//       const courseData: Partial<Course> = {
//         title: 'Updated JavaScript Course',
//         description: 'Updated description',
//         thumbnail: 'https://example.com/updated-thumbnail.jpg',
//         price: 149.99,
//         category: 'Programming',
//         level: 'Intermediate',
//         duration: '15 hours'
//       };
      
//       const response = await AuthService.updateCourse(courseId, courseData);
//       console.log('Course updated:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to update course:', error);
//       throw error;
//     }
//   },

//   // Delete course (Admin only)
//   async deleteCourseExample(courseId: string) {
//     try {
//       const response = await AuthService.deleteCourse(courseId);
//       console.log('Course deleted:', response.data.message);
//       return response;
//     } catch (error) {
//       console.error('Failed to delete course:', error);
//       throw error;
//     }
//   },

//   // Get courses by creator
//   async getCoursesByCreatorExample(userId: string) {
//     try {
//       const response = await AuthService.getCoursesByCreator(userId, {
//         page: 1,
//         limit: 10
//       });
//       console.log('Creator courses:', response.data.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to get creator courses:', error);
//       throw error;
//     }
//   }
// };

// // 4. COURSE STRUCTURE EXAMPLES
// export const courseStructureExamples = {
//   // Get course structure by course ID (Admin only)
//   async getCourseStructureByCourseIdExample(courseId: string) {
//     try {
//       const response = await AuthService.getCourseStructureByCourseId(courseId);
//       console.log('Course structures:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to get course structures:', error);
//       throw error;
//     }
//   },

//   // Create course structure (Admin only)
//   async createCourseStructureExample(courseId: string) {
//     try {
//       const structureData = {
//         courseId: courseId,
//         title: 'Introduction to JavaScript',
//         lectures: 8,
//         duration: '4 hours',
//         videoUrl: 'https://example.com/videos/javascript-basics.mp4',
//         pdfUrl: 'https://example.com/pdfs/javascript-basics.pdf',
//         order: 1
//       };
      
//       const response = await AuthService.createCourseStructure(structureData);
//       console.log('Course structure created:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to create course structure:', error);
//       throw error;
//     }
//   },

//   // Update course structure (Admin only)
//   async updateCourseStructureExample(structureId: string) {
//     try {
//       const structureData: Partial<CourseStructure> = {
//         title: 'Updated JavaScript Introduction',
//         lectures: 10,
//         duration: '5 hours',
//         videoUrl: 'https://example.com/videos/updated-javascript.mp4',
//         pdfUrl: 'https://example.com/pdfs/updated-javascript.pdf',
//         order: 1
//       };
      
//       const response = await AuthService.updateCourseStructure(structureId, structureData);
//       console.log('Course structure updated:', response.data);
//       return response;
//     } catch (error) {
//       console.error('Failed to update course structure:', error);
//       throw error;
//     }
//   },

//   // Delete course structure (Admin only)
//   async deleteCourseStructureExample(structureId: string) {
//     try {
//       const response = await AuthService.deleteCourseStructure(structureId);
//       console.log('Course structure deleted:', response.data.message);
//       return response;
//     } catch (error) {
//       console.error('Failed to delete course structure:', error);
//       throw error;
//     }
//   },

//   // Reorder course structures (Admin only)
//   async reorderCourseStructuresExample(courseId: string) {
//     try {
//       const structureIds = ['structure-id-1', 'structure-id-2', 'structure-id-3'];
//       const response = await AuthService.reorderCourseStructures(courseId, structureIds);
//       console.log('Course structures reordered:', response.data.message);
//       return response;
//     } catch (error) {
//       console.error('Failed to reorder course structures:', error);
//       throw error;
//     }
//   }
// };

// // Utility examples
// export const utilityExamples = {
//   // Check if user is authenticated
//   checkAuthStatus() {
//     const isAuth = AuthService.isAuthenticated();
//     console.log('Is authenticated:', isAuth);
//     return isAuth;
//   },

//   // Get current user from localStorage
//   getCurrentUserFromStorage() {
//     const user = AuthService.getCurrentUser();
//     console.log('Current user from storage:', user);
//     return user;
//   },

//   // Check if user is admin
//   checkAdminStatus() {
//     const isAdmin = AuthService.isAdmin();
//     console.log('Is admin:', isAdmin);
//     return isAdmin;
//   },

//   // Logout
//   logout() {
//     AuthService.logout();
//     console.log('User logged out');
//   }
// };

// // Complete workflow example
// export const completeWorkflowExample = async () => {
//   try {
//     // 1. Login
//     await authenticationExamples.loginExample();
    
//     // 2. Check if admin
//     if (utilityExamples.checkAdminStatus()) {
//       // 3. Get all users
//       await userManagementExamples.getAllUsersExample();
      
//       // 4. Create a course
//       const courseResponse = await courseManagementExamples.createCourseExample();
//       const courseId = courseResponse.data.id;
      
//       // 5. Create course structure
//       await courseStructureExamples.createCourseStructureExample(courseId);
      
//       // 6. Get course structures
//       await courseStructureExamples.getCourseStructureByCourseIdExample(courseId);
//     } else {
//       // Student workflow
//       await courseManagementExamples.getAllCoursesExample();
//     }
    
//     // 7. Update own profile
//     await userManagementExamples.updateOwnProfileExample();
    
//   } catch (error) {
//     console.error('Workflow failed:', error);
//   }
// }; 