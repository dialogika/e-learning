# Development Setup Guide

## Port Configuration

### Frontend (React/Vite)
- **Port**: 5173
- **URL**: http://localhost:5173
- **API Proxy**: /api → http://localhost:3000

### Backend (External)
- **Port**: 3000
- **URL**: http://localhost:3000
- **API Base**: http://localhost:3000/api
- **Note**: Backend is running from external code/project

## Environment Variables

### Frontend (.env)
```env
VITE_API_BASE_URL=/api
VITE_APP_NAME=E-Learning LMS
VITE_APP_VERSION=1.0.0
VITE_DEV_MODE=true
VITE_DEBUG_ENABLED=true
```

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
API_PREFIX=/api
API_VERSION=v1
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=debug
```

## Running the Application

### Option 1: Run Frontend Only
```bash
npm run dev:frontend
# or
npm run dev
```

### Option 2: Run Backend Only
```bash
# Backend should be running from external project
# Make sure backend is running on http://localhost:3000
```

### Option 3: Run Both (Recommended)
```bash
# Start frontend
npm run dev:frontend

# Make sure backend is running from external project on port 3000
```

### Option 4: Manual Setup
```bash
# Terminal 1 - Frontend
npm run dev:frontend

# Terminal 2 - Backend (External Project)
# Make sure your external backend is running on port 3000
```

## API Proxy Configuration

The frontend is configured with a proxy that automatically forwards all `/api` requests to the backend:

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

This means:
- Frontend requests to `/api/auth/login` → Backend `http://localhost:3000/api/auth/login`
- Frontend requests to `/api/courses` → Backend `http://localhost:3000/api/courses`
- No CORS issues in development

## Development Workflow

1. **Start Backend First (External Project)**
   ```bash
   # Make sure your external backend is running on port 3000
   # Backend should be accessible at http://localhost:3000
   ```

2. **Start Frontend**
   ```bash
   npm install
   npm run dev:frontend
   ```

3. **Access Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - Health Check: http://localhost:3000/health

## Troubleshooting

### Port Already in Use
If you get "port already in use" error:

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev:backend
```

### CORS Issues
If you encounter CORS issues:
1. Make sure backend is running on port 3000
2. Check that frontend is using the proxy configuration
3. Verify environment variables are set correctly

### API Connection Issues
1. Check if backend is running: http://localhost:3000/health
2. Verify API endpoints: http://localhost:3000/api/auth/login
3. Check browser console for network errors

## Production Setup

For production, you'll need to:
1. Set `NODE_ENV=production`
2. Configure proper CORS origins
3. Use environment-specific API URLs
4. Set up proper SSL certificates
5. Configure reverse proxy (nginx/apache)

## Useful Commands

```bash
# Check what's running on ports
lsof -i :3000
lsof -i :5173

# Kill all node processes
pkill -f node

# Clear npm cache
npm cache clean --force

# Reset database
npm run db:seed
``` 