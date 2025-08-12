import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/auth.ts';
import { useToast } from '../../context/ToastContext.jsx';

const CourseManagement = () => {
  const { showApiResponse, showError, showSuccess } = useToast();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [structures, setStructures] = useState([]);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' or 'structures'

  useEffect(() => {
    if (activeTab === 'courses') {
      fetchCourses();
    }
  }, [currentPage, searchTerm, activeTab]);

  // Refresh data when component mounts or when returning from other pages
  useEffect(() => {
    const handleFocus = () => {
      if (activeTab === 'courses') {
        fetchCourses();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [activeTab]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm || undefined
      };
      
      const response = await AuthService.getAllCourses(params);
      
      if (response.success) {
        setCourses(response.data.data || response.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        showError('Failed to fetch courses');
      }
      
    } catch (error) {
      showError(error.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourseStructures = async (courseId) => {
    try {
      setLoading(true);
      
      const courseResponse = await AuthService.getCourseById(courseId);
      
      if (courseResponse.success) {
        setSelectedCourse(courseResponse.data);
        // Structures are included in the course response
        setStructures(courseResponse.data.structures || []);
      } else {
        showError('Failed to fetch course structures');
      }
      
    } catch (error) {
      showError(error.message || 'Failed to fetch course structures');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await AuthService.deleteCourse(courseId);
      showApiResponse(response, 'Course deleted successfully!');
      
      if (response.success) {
        setShowDeleteModal(false);
        setCourseToDelete(null);
        fetchCourses(); // Refresh the list
      }
    } catch (error) {
      showError(error.message || 'Failed to delete course');
    }
  };

  const handleDeleteStructure = async (structureId) => {
    try {
      const response = await AuthService.deleteCourseStructure(structureId);
      showApiResponse(response, 'Structure deleted successfully!');
      
      if (response.success) {
        fetchCourseStructures(selectedCourse.id); // Refresh structures
      }
    } catch (error) {
      showError(error.message || 'Failed to delete structure');
    }
  };

  const confirmDelete = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const handleViewStructures = (course) => {
    setSelectedCourse(course);
    setActiveTab('structures');
    fetchCourseStructures(course.id);
  };

  const handleBackToCourses = () => {
    setActiveTab('courses');
    setSelectedCourse(null);
    setStructures([]);
  };

  if (loading) {
    return (
      <div className="py-12 px-4 w-full">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="h-6 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {activeTab === 'structures' ? 'Course Structures' : 'Course Management'}
          </h1>
          {activeTab === 'structures' && selectedCourse && (
            <p className="text-gray-600 mt-2">
              Managing structures for: <span className="font-semibold">{selectedCourse.title}</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {activeTab === 'structures' && (
            <button
              onClick={handleBackToCourses}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Back to Courses
            </button>
          )}
          {activeTab === 'courses' && (
            <Link
              to="/admin/add-course"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Course
            </Link>
          )}
          {activeTab === 'structures' && (
            <Link
              to={`/admin/add-structure/${selectedCourse?.id}`}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Structure
            </Link>
          )}
        </div>
      </div>

      {/* Search Bar - Only show for courses tab */}
      {activeTab === 'courses' && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'courses' ? (
        // Courses List
        <div className="space-y-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      {course.image && (
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            {course.category || 'General'}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {course.level || 'All Levels'}
                          </span>
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                            {course.duration || 'Flexible'}
                          </span>
                          <span className="text-gray-500">Instructor: {course.instructor}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          Created: {new Date(course.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin/edit-course/${course.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleViewStructures(course)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Structures
                    </button>
                    <button
                      onClick={() => confirmDelete(course)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? `No courses match "${searchTerm}"` : 'No courses available.'}
              </p>
              <Link
                to="/admin/add-course"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add Your First Course
              </Link>
            </div>
          )}
        </div>
      ) : (
        // Structures List
        <div className="space-y-4">
          {structures.length > 0 ? (
            structures.map((structure, index) => (
              <div key={structure.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{structure.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Lectures: {structure.lectures}</span>
                          <span>Duration: {structure.duration}</span>
                          <span>Order: {structure.order}</span>
                          {structure.videoUrl && (
                            <span className="text-green-600">Has Video</span>
                          )}
                          {structure.pdfUrl && (
                            <span className="text-blue-600">Has PDF</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/admin/edit-structure/${structure.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteStructure(structure.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No structures found</h3>
              <p className="text-gray-500 mb-4">
                This course doesn't have any structures yet. Add the first structure to get started.
              </p>
              <Link
                to={`/admin/add-structure/${selectedCourse?.id}`}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Add First Structure
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Pagination - Only for courses */}
      {activeTab === 'courses' && !loading && courses.length > 0 && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{courseToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCourseToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCourse(courseToDelete.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement; 