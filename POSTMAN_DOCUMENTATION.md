# 🚀 Dialogika Learning Platform - Postman Documentation

## 📋 Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [Environment Variables](#environment-variables)
3. [Authentication Endpoints](#authentication-endpoints)
4. [User Management Endpoints](#user-management-endpoints)
5. [Course Management Endpoints](#course-management-endpoints)
6. [Course Structure Endpoints](#course-structure-endpoints)
7. [Health Check Endpoint](#health-check-endpoint)
8. [Test Credentials](#test-credentials)
9. [Testing Scenarios](#testing-scenarios)
10. [Error Handling](#error-handling)

---

## 🔧 Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click "Import" button
3. Create a new collection named "Dialogika API"
4. Add the following environment variables

### 2. Environment Setup
Create a new environment in Postman with these variables:

| Variable Name | Initial Value | Current Value | Description |
|---------------|---------------|---------------|-------------|
| `base_url` | `http://localhost:3000` | `http://localhost:3000` | API Base URL |
| `admin_token` | `` | `` | Admin JWT Token |
| `user_token` | `` | `` | User JWT Token |
| `user_id` | `` | `` | User ID for testing |
| `course_id` | `` | `` | Course ID for testing |
| `structure_id` | `` | `` | Structure ID for testing |

---

## 🔐 Authentication Endpoints

### 1. Login User
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/login`  
**Headers:**
```
Content-Type: application/json
```
**Body (raw JSON):**
```json
{
  "email": "admin@dialogika.com",
  "password": "admin123"
}
```
**Test Script (to auto-set token):**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.success && response.data.token) {
        pm.environment.set("admin_token", response.data.token);
        pm.environment.set("user_token", response.data.token);
        
        // Auto-set admin_token if role is ADMIN
        if (response.data.user.role === "ADMIN") {
            pm.environment.set("admin_token", response.data.token);
        }
    }
}
```

### 2. Register User (ADMIN ONLY)
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/register`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```
**Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("user_id", response.data.id);
    }
}
```

### 3. Get Current User Profile
**Method:** `GET`  
**URL:** `{{base_url}}/api/auth/me`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```

### 4. Logout User
**Method:** `POST`  
**URL:** `{{base_url}}/api/auth/logout`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```
**Test Script:**
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.success) {
        // Clear tokens from environment
        pm.environment.unset("admin_token");
        pm.environment.unset("user_token");
        console.log("Tokens cleared from environment");
    }
}
```

---

## 👥 User Management Endpoints

### 4. Get All Users (ADMIN ONLY)
**Method:** `GET`  
**URL:** `{{base_url}}/api/users`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```
**Query Params (Optional):**
```
page: 1
limit: 10
search: john
```

### 5. Get User by ID (ADMIN ONLY)
**Method:** `GET`  
**URL:** `{{base_url}}/api/users/{{user_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

### 6. Get Own Profile
**Method:** `GET`  
**URL:** `{{base_url}}/api/users/profile`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```

### 7. Update User Profile (ADMIN ONLY)
**Method:** `PUT`  
**URL:** `{{base_url}}/api/users/{{user_id}}`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "role": "ADMIN"
}
```

### 8. Update User Password (ADMIN ONLY)
**Method:** `PUT`  
**URL:** `{{base_url}}/api/users/{{user_id}}/password`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "newPassword": "newpassword123"
}
```

### 9. Update Own Profile
**Method:** `PUT`  
**URL:** `{{base_url}}/api/users/profile`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{user_token}}
```
**Body (raw JSON):**
```json
{
  "name": "My Updated Name",
  "email": "my.updated@example.com",
  "avatar": "https://example.com/my-avatar.jpg"
}
```

### 10. Delete User (ADMIN ONLY)
**Method:** `DELETE`  
**URL:** `{{base_url}}/api/users/{{user_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

---

## 📚 Course Management Endpoints

### 11. Get All Courses (AUTHENTICATED)
**Method:** `GET`  
**URL:** `{{base_url}}/api/courses`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```
**Query Params (Optional):**
```
page: 1
limit: 10
search: javascript
```

### 12. Search Courses (AUTHENTICATED)
**Method:** `GET`  
**URL:** `{{base_url}}/api/courses/search`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```
**Query Params:**
```
q: javascript
category: Programming
level: Beginner
instructor: John Doe
page: 1
limit: 10
sortBy: createdAt
sortOrder: desc
```

### 12. Get Course by ID (AUTHENTICATED)
**Method:** `GET`  
**URL:** `{{base_url}}/api/courses/{{course_id}}`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```

### 13. Create Course (ADMIN ONLY)
**Method:** `POST`  
**URL:** `{{base_url}}/api/courses`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from scratch with practical examples",
  "image": "https://via.placeholder.com/400x250/FFD93D/FFFFFF?text=JavaScript",
  "instructor": "John Doe",
  "category": "Programming",
  "level": "Beginner",
  "duration": "10 weeks"
}
```
**Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("course_id", response.data.id);
    }
}
```

### 14. Update Course (ADMIN ONLY)
**Method:** `PUT`  
**URL:** `{{base_url}}/api/courses/{{course_id}}`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "title": "Updated JavaScript Course",
  "description": "Updated description with more content",
  "image": "https://via.placeholder.com/400x250/FFD93D/FFFFFF?text=Updated+JS",
  "instructor": "Jane Smith",
  "category": "Programming",
  "level": "Intermediate",
  "duration": "12 weeks"
}
```

### 15. Delete Course (ADMIN ONLY)
**Method:** `DELETE`  
**URL:** `{{base_url}}/api/courses/{{course_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

### 16. Get Courses by Creator (AUTHENTICATED)
**Method:** `GET`  
**URL:** `{{base_url}}/api/courses/creator/{{user_id}}`  
**Headers:**
```
Authorization: Bearer {{user_token}}
```
**Query Params (Optional):**
```
page: 1
limit: 10
```

---

## 🏗️ Course Structure Endpoints

### 17. Get Course Structure by Course ID (ADMIN ONLY)
**Method:** `GET`  
**URL:** `{{base_url}}/api/course-structures/course/{{course_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

### 18. Get Course Structure by ID (ADMIN ONLY)
**Method:** `GET`  
**URL:** `{{base_url}}/api/course-structures/{{structure_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

### 19. Create Course Structure (ADMIN ONLY)
**Method:** `POST`  
**URL:** `{{base_url}}/api/course-structures`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "courseId": "{{course_id}}",
  "title": "JavaScript Fundamentals",
  "lectures": 8,
  "duration": "4 hours",
  "videoUrl": "https://example.com/videos/javascript-basics.mp4",
  "pdfUrl": "https://example.com/pdfs/javascript-basics.pdf",
  "order": 3
}
```
**Test Script:**
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("structure_id", response.data.id);
    }
}
```

### 20. Update Course Structure (ADMIN ONLY)
**Method:** `PUT`  
**URL:** `{{base_url}}/api/course-structures/{{structure_id}}`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "title": "Updated JavaScript Fundamentals",
  "lectures": 10,
  "duration": "5 hours",
  "videoUrl": "https://example.com/videos/updated-javascript.mp4",
  "pdfUrl": "https://example.com/pdfs/updated-javascript.pdf",
  "order": 3
}
```

### 21. Delete Course Structure (ADMIN ONLY)
**Method:** `DELETE`  
**URL:** `{{base_url}}/api/course-structures/{{structure_id}}`  
**Headers:**
```
Authorization: Bearer {{admin_token}}
```

### 22. Reorder Course Structures (ADMIN ONLY)
**Method:** `PUT`  
**URL:** `{{base_url}}/api/course-structures/reorder/{{course_id}}`  
**Headers:**
```
Content-Type: application/json
Authorization: Bearer {{admin_token}}
```
**Body (raw JSON):**
```json
{
  "structureIds": [
    "structure_id_1",
    "structure_id_2",
    "structure_id_3"
  ]
}
```

---

## 🏥 Health Check Endpoint

### 23. Health Check
**Method:** `GET`  
**URL:** `{{base_url}}/health`  
**Headers:** None

---

## 🔑 Test Credentials

### Admin User
```
Email: admin@dialogika.com
Password: admin123
Role: ADMIN
```

### Student Users
```
Email: john.doe@example.com
Password: student123
Role: STUDENT

Email: jane.smith@example.com
Password: student123
Role: STUDENT

Email: mike.wilson@example.com
Password: student123
Role: STUDENT
```

---

## 🧪 Testing Scenarios

### Scenario 1: Initial Setup
1. **Health Check** → Should return 200 OK
2. **Login Admin** → Should return token and set admin_token
3. **Login Student** → Should return token and set user_token

### Scenario 2: Admin User Management
1. **Register New User** → Should create user and set user_id
2. **Get All Users** → Should return paginated users
3. **Get User by ID** → Should return specific user
4. **Update User Profile** → Should update user data
5. **Update User Password** → Should update password (no current password needed)
6. **Delete User** → Should delete user

### Scenario 3: Course Management
1. **Create Course** → Should create course and set course_id
2. **Get All Courses** → Should return paginated courses
3. **Get Course by ID** → Should return specific course
4. **Update Course** → Should update course data
5. **Delete Course** → Should delete course

### Scenario 4: Course Structure Management
1. **Create Course Structure** → Should create structure and set structure_id
2. **Get Course Structures** → Should return course structures
3. **Update Course Structure** → Should update structure data
4. **Reorder Structures** → Should reorder structures
5. **Delete Course Structure** → Should delete structure

### Scenario 5: User Self Management
1. **Get Own Profile** → Should return current user profile
2. **Update Own Profile** → Should update own profile (without role)
3. **Try Change Password** → Should return 404 Not Found (endpoint removed)

---

## ⚠️ Error Handling

### Common HTTP Status Codes
- **200** - Success
- **201** - Created
- **400** - Bad Request (Validation Error)
- **401** - Unauthorized (No Token/Invalid Token)
- **403** - Forbidden (No Permission)
- **404** - Not Found
- **500** - Internal Server Error

### Error Response Examples

#### 400 Bad Request (Validation Error)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "type": "field",
      "msg": "Valid email is required",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is missing or invalid"
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Admin role required"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## 📝 Postman Collection Setup

### 1. Create Collection Structure
```
Dialogika API
├── Authentication
│   ├── Login
│   ├── Register (Admin Only)
│   └── Get Profile
├── User Management
│   ├── Get All Users (Admin Only)
│   ├── Get User by ID (Admin Only)
│   ├── Get Own Profile
│   ├── Update User Profile (Admin Only)
│   ├── Update User Password (Admin Only)
│   ├── Update Own Profile
│   └── Delete User (Admin Only)
├── Course Management
│   ├── Get All Courses
│   ├── Get Course by ID
│   ├── Create Course (Admin Only)
│   ├── Update Course (Admin Only)
│   ├── Delete Course (Admin Only)
│   └── Get Courses by Creator
├── Course Structure
│   ├── Get Course Structures (Admin Only)
│   ├── Get Structure by ID (Admin Only)
│   ├── Create Structure (Admin Only)
│   ├── Update Structure (Admin Only)
│   ├── Delete Structure (Admin Only)
│   └── Reorder Structures (Admin Only)
└── Health Check
    └── Health Check
```

### 2. Pre-request Scripts
For endpoints that require authentication, add this pre-request script:
```javascript
// Check if token exists
const token = pm.environment.get("admin_token") || pm.environment.get("user_token");
if (!token) {
    console.error("No token found. Please login first.");
}
```

### 3. Test Scripts for Auto-Set Variables
Add these test scripts to automatically set environment variables:

#### Login Success Script
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.success && response.data.token) {
        pm.environment.set("token", response.data.token);
        
        // Auto-set admin_token if role is ADMIN
        if (response.data.user.role === "ADMIN") {
            pm.environment.set("admin_token", response.data.token);
        }
    }
}
```

#### Create User Success Script
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("user_id", response.data.id);
    }
}
```

#### Create Course Success Script
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("course_id", response.data.id);
    }
}
```

#### Create Course Structure Success Script
```javascript
if (pm.response.code === 201) {
    const response = pm.response.json();
    if (response.success && response.data.id) {
        pm.environment.set("structure_id", response.data.id);
    }
}
```

---

## 🚀 Quick Start Guide

### Step 1: Start the Server
```bash
npm run dev
```

### Step 2: Test Health Check
1. Send GET request to `{{base_url}}/health`
2. Should return 200 OK

### Step 3: Login as Admin
1. Send POST request to `{{base_url}}/api/auth/login`
2. Use admin credentials
3. Token will be auto-set in environment

### Step 4: Test Admin Functions
1. Create a new user
2. Get all users
3. Update user profile
4. Create a course
5. Manage course structures

### Step 5: Test User Functions
1. Login as student
2. Get own profile
3. Update own profile
4. Browse courses

---

## 📊 Response Examples

### Success Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  },
  "pagination": {
    // Pagination info (if applicable)
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    // Validation errors (if applicable)
  ]
}
```

---

## 🎯 Authorization Rules Summary

### ✅ Admin Can:
- Register new users
- Get all users
- Get user by ID (any user)
- Update any user profile (name, email, avatar, role)
- Update any user password (without current password)
- Delete any user
- Manage all courses and course structures

### ✅ User (Student/Admin) Can:
- Get own profile
- Update own profile (name, email, avatar) - **CANNOT UPDATE ROLE**

### ❌ User (Student) Cannot:
- Register new users
- Get all users
- Get other user by ID
- Update other user profile
- Update any password (including own password)
- Delete any user
- Update role
- Manage courses and course structures

---

## 🔒 Security Features

### Password Security:
- **Centralized Control**: Only admin can update passwords
- **No Self-Reset**: Users cannot reset their own passwords
- **Admin Privilege**: Admin doesn't need current password to update user passwords
- **Secure Hashing**: Passwords are hashed with bcrypt

### Role-Based Access:
- **ADMIN**: Full access to all endpoints
- **STUDENT**: Limited access (own profile only)
- **Protected Routes**: All sensitive operations require admin role

### Authentication:
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Tokens expire after 24 hours
- **Role Verification**: Middleware checks user roles for protected routes

---

## 📋 Summary

**Total Endpoints: 24**
- 🔐 **Authentication**: 4 endpoints
- 👥 **User Management**: 7 endpoints
- 📚 **Course Management**: 6 endpoints
- 🏗️ **Course Structure**: 6 endpoints
- 🏥 **Health Check**: 1 endpoint

**Ready for Postman Testing!** 🚀

All endpoints are documented with:
- ✅ Complete request details (method, URL, headers, body)
- ✅ Success and error response examples
- ✅ Test scripts for auto-setting variables
- ✅ Authorization requirements
- ✅ Testing scenarios
- ✅ Error handling patterns 