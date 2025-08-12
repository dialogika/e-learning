# E-Learning LMS Frontend

This is the frontend application for the E-Learning LMS system. The backend is running from an external project.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:3000

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── common/         # Shared components
│   ├── students/       # Student-specific components
│   └── learning/       # Learning components
├── context/            # React context providers
├── pages/              # Page components
│   ├── admin/          # Admin pages
│   └── students/       # Student pages
├── services/           # API services
├── utils/              # Utility functions
└── config/             # Configuration files
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=/api
VITE_APP_NAME=E-Learning LMS
VITE_APP_VERSION=1.0.0
```

### API Configuration
The frontend is configured to proxy all `/api` requests to `http://localhost:3000`:

```javascript
// vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run dev:frontend` - Start frontend on port 5173
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Development Workflow

1. **Ensure backend is running**
   - Backend should be accessible at http://localhost:3000
   - API endpoints should be available at http://localhost:3000/api

2. **Start frontend**
   ```bash
   npm run dev:frontend
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - All API calls will be proxied to backend

## 🔐 Authentication

The application supports two user roles:
- **Student**: Can view courses, enroll, and access learning materials
- **Admin**: Can manage users, courses, and system settings

### Demo Credentials
- **Admin**: admin@dialogika.com / admin123
- **Student**: student1@example.com / student123

## 📚 Features

### Student Features
- Browse courses
- View course details
- Enroll in courses
- Access learning materials
- Track progress

### Admin Features
- User management
- Course management
- Course structure management
- Enrollment management
- System analytics

## 🚨 Troubleshooting

### Backend Connection Issues
1. Ensure backend is running on port 3000
2. Check if backend API is accessible: http://localhost:3000/health
3. Verify CORS configuration in backend

### Port Conflicts
If port 5173 is in use:
```bash
# Check what's using the port
lsof -i :5173

# Kill the process
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3001
```

### API Errors
1. Check browser console for network errors
2. Verify backend is running and accessible
3. Check API endpoint responses

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
