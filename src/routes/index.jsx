import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute.jsx';

// Public pages
import Login from '../pages/students/Login.jsx';
import Signup from '../pages/students/Signup.jsx';

// Student pages
import Home from '../pages/students/Home.jsx';
import CourseList from '../pages/students/CourseList.jsx';
import CourseDetails from '../pages/students/CourseDetails.jsx';
import MyEnrollmen from '../pages/students/MyEnrollmen.jsx';
import Player from '../pages/students/Player.jsx';

// Admin pages
import Admin from '../pages/admin/Admin.jsx';
import Dashboard from '../pages/admin/Dashboard.jsx';
import AddCourse from '../pages/admin/AddCourse.jsx';
import EditCourse from '../pages/admin/EditCourse.jsx';
import CourseManagement from '../pages/admin/CourseManagement.jsx';
import AddUser from '../pages/admin/AddUser.jsx';
import EditUser from '../pages/admin/EditUser.jsx';
import UserManagement from '../pages/admin/UserManagement.jsx';
import StudentsErolled from '../pages/admin/StudentsErolled.jsx';

// Error pages
import NotFound from '../pages/errors/NotFound.jsx';
import Unauthorized from '../pages/errors/Unauthorized.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      
      <Route path="/signup" element={
        <ProtectedRoute requireAuth={false}>
          <Signup />
        </ProtectedRoute>
      } />

      {/* Student Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      <Route path="/courses" element={
        <ProtectedRoute>
          <CourseList />
        </ProtectedRoute>
      } />
      
      <Route path="/courses/:id" element={
        <ProtectedRoute>
          <CourseDetails />
        </ProtectedRoute>
      } />
      
      <Route path="/my-enrollments" element={
        <ProtectedRoute>
          <MyEnrollmen />
        </ProtectedRoute>
      } />
      
      <Route path="/player/:courseId/:structureId" element={
        <ProtectedRoute>
          <Player />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <Admin />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requireAdmin={true}>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/add-course" element={
        <ProtectedRoute requireAdmin={true}>
          <AddCourse />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/edit-course/:id" element={
        <ProtectedRoute requireAdmin={true}>
          <EditCourse />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/courses" element={
        <ProtectedRoute requireAdmin={true}>
          <CourseManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/add-user" element={
        <ProtectedRoute requireAdmin={true}>
          <AddUser />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/edit-user/:id" element={
        <ProtectedRoute requireAdmin={true}>
          <EditUser />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute requireAdmin={true}>
          <UserManagement />
        </ProtectedRoute>
      } />

      {/* Error Routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/404" element={<NotFound />} />
      
      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 