# Dialogika Backend API

A robust Node.js backend API built with TypeScript, Express, and Prisma for a learning management system.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Complete CRUD operations for users with admin/student roles
- **Course Management**: Create, read, update, and delete courses with rich metadata
- **Course Structures**: Manage course content with ordered sections, videos, and PDFs
- **Database**: MySQL database with Prisma ORM for type-safe database operations
- **Validation**: Request validation using express-validator
- **Security**: Helmet, CORS, rate limiting, and password hashing
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd Backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your database:

```bash
cp env.example .env
```

Edit `.env` with your database credentials:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/dialogika_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development
```

### 3. Database Setup

Generate Prisma client and push the schema:

```bash
npm run db:generate
npm run db:push
```

### 4. Seed Database (Optional)

Populate the database with sample data:

```bash
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

### User Management Endpoints

#### Get All Users (Admin Only)
```http
GET /api/users?page=1&limit=10&search=john
Authorization: Bearer <admin-token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Delete User (Admin Only)
```http
DELETE /api/users/:id
Authorization: Bearer <admin-token>
```

### Course Management Endpoints

#### Get All Courses
```http
GET /api/courses?page=1&limit=10&search=react&category=Programming&level=Beginner
```

#### Get Course by ID
```http
GET /api/courses/:id
```

#### Create Course (Admin Only)
```http
POST /api/courses
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "React Fundamentals",
  "description": "Learn React from scratch",
  "image": "https://example.com/course-image.jpg",
  "instructor": "John Doe",
  "category": "Programming",
  "level": "Beginner",
  "duration": "8 weeks"
}
```

#### Update Course (Admin Only)
```http
PUT /api/courses/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Updated Course Title",
  "description": "Updated description"
}
```

#### Delete Course (Admin Only)
```http
DELETE /api/courses/:id
Authorization: Bearer <admin-token>
```

#### Get Courses by Creator
```http
GET /api/courses/creator/:userId?page=1&limit=10
```

### Course Structure Endpoints

#### Get Course Structures
```http
GET /api/course-structures/course/:courseId
```

#### Get Structure by ID
```http
GET /api/course-structures/:id
```

#### Create Structure (Admin Only)
```http
POST /api/course-structures
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Introduction to React",
  "lectures": 5,
  "duration": "2 hours",
  "order": 1,
  "courseId": "course-id",
  "videoUrl": "https://example.com/video.mp4",
  "pdfUrl": "https://example.com/notes.pdf"
}
```

#### Update Structure (Admin Only)
```http
PUT /api/course-structures/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "title": "Updated Structure Title",
  "lectures": 6
}
```

#### Delete Structure (Admin Only)
```http
DELETE /api/course-structures/:id
Authorization: Bearer <admin-token>
```

#### Reorder Structures (Admin Only)
```http
PUT /api/course-structures/reorder/:courseId
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "structures": [
    { "id": "structure-1", "order": 1 },
    { "id": "structure-2", "order": 2 },
    { "id": "structure-3", "order": 3 }
  ]
}
```

## 🔐 Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **ADMIN**: Full access to all endpoints
- **STUDENT**: Limited access, can only view courses and manage own profile

## 📊 Database Schema

### Users
- `id`: Unique identifier (CUID)
- `email`: Unique email address
- `password`: Hashed password
- `name`: User's full name
- `role`: User role (ADMIN/STUDENT)
- `avatar`: Optional avatar URL
- `createdAt`: Account creation timestamp
- `updatedAt`: Last update timestamp

### Courses
- `id`: Unique identifier (CUID)
- `title`: Course title
- `description`: Course description
- `image`: Course image URL
- `instructor`: Instructor name
- `category`: Course category
- `level`: Difficulty level
- `duration`: Course duration
- `createdById`: Reference to user who created the course
- `createdAt`: Course creation timestamp
- `updatedAt`: Last update timestamp

### Course Structures
- `id`: Unique identifier (CUID)
- `title`: Structure title
- `lectures`: Number of lectures
- `duration`: Structure duration
- `videoUrl`: Optional video URL
- `pdfUrl`: Optional PDF URL
- `order`: Order within the course
- `courseId`: Reference to parent course
- `createdAt`: Structure creation timestamp
- `updatedAt`: Last update timestamp

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL database connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Make sure to set appropriate environment variables for production:

- Use a strong `JWT_SECRET`
- Set `NODE_ENV=production`
- Configure production database URL
- Set up proper CORS origins

## 📝 Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (if any)
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository. 