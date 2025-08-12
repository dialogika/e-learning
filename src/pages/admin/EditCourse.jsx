import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.ts';
import { handleApiError } from '../../utils/apiErrorHandler.js';
import { useToast } from '../../context/ToastContext.jsx';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showApiResponse, showError } = useToast();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    category: '',
    image: '',
    status: 'Active'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      
      const response = await AuthService.getCourseById(id);
      const courseData = response.data;
      
      setCourse({
        title: courseData.title || '',
        description: courseData.description || '',
        instructor: courseData.instructor || '',
        duration: courseData.duration || '',
        level: courseData.level || 'Beginner',
        category: courseData.category || '',
        image: courseData.image || '',
        status: courseData.status || 'Active',
      });
      
    } catch (error) {
      console.error('Error fetching course:', error);
      showError(error.message || 'Failed to fetch course data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      console.log('Sending course data:', course);
      const response = await AuthService.updateCourse(id, course);
      console.log('Update response:', response);
      showApiResponse(response, 'Course updated successfully!');
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error updating course:', error);
      showError(error.message || 'Failed to update course');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setIsSaving(true);
      
      try {
        const response = await AuthService.deleteCourse(id);
        showApiResponse(response, 'Course deleted successfully!');
        navigate('/admin/courses');
      } catch (error) {
        console.error('Error deleting course:', error);
        showError(error.message || 'Failed to delete course');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
        <div className="h-5 w-1/2 bg-gray-200 rounded mb-6" />
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded mb-4" />
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded mb-4" />
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded mb-4" />
            <div className="h-5 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-100 rounded mb-4" />
          </div>
          <div className="h-10 w-32 bg-gray-200 rounded mt-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600 mt-2">Update course information and settings</p>
        </div>
        <button
          onClick={handleDelete}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isSaving ? 'Deleting...' : 'Delete Course'}
        </button>
      </div>

      {/* Course Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course title"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={course.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course description"
              />
            </div>

            {/* Instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor *
              </label>
              <input
                type="text"
                name="instructor"
                value={course.instructor}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter instructor name"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={course.duration}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 8 weeks, 6 months"
              />
            </div>

            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level *
              </label>
              <select
                name="level"
                value={course.level}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={course.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course category"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={course.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Image URL
              </label>
              <input
                type="url"
                name="image"
                value={course.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URL"
              />
              {course.image && (
                <div className="mt-2">
                  <img 
                    src={course.image} 
                    alt="Course preview" 
                    className="w-32 h-20 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>


          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/my-courses')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              {isSaving ? 'Saving...' : 'Update Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse; 