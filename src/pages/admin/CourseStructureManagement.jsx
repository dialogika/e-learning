import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AuthService from '../../services/auth.ts';
import { handleApiError } from '../../utils/apiErrorHandler.js';

const CourseStructureManagement = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [structures, setStructures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [structureToDelete, setStructureToDelete] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourseAndStructures();
    }
  }, [courseId]);

  const fetchCourseAndStructures = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch course details
      const courseResponse = await AuthService.getCourseById(courseId);
      setCourse(courseResponse.data);

      // Fetch course structures
      const structuresResponse = await AuthService.getCourseStructuresByCourseId(courseId);
      setStructures(structuresResponse.data);

    } catch (error) {
      console.error('Error fetching course and structures:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStructure = async (structureId) => {
    try {
      await AuthService.deleteCourseStructure(structureId);
      setShowDeleteModal(false);
      setStructureToDelete(null);
      fetchCourseAndStructures(); // Refresh the list
    } catch (error) {
      console.error('Error deleting structure:', error);
      setError(handleApiError(error));
    }
  };

  const confirmDelete = (structure) => {
    setStructureToDelete(structure);
    setShowDeleteModal(true);
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

  if (error) {
    return (
      <div className="py-12 px-4 w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course Structures</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchCourseAndStructures} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Course Structures</h1>
          {course && (
            <p className="text-gray-600 mt-2">
              Managing structures for: <span className="font-semibold">{course.title}</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/courses"
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Back to Courses
          </Link>
          <Link
            to={`/admin/add-structure/${courseId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Structure
          </Link>
        </div>
      </div>

      {/* Structures List */}
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
                      <p className="text-gray-600 text-sm mb-2">{structure.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Type: {structure.type || 'VIDEO'}</span>
                        <span>Duration: {structure.duration || 0} minutes</span>
                        <span>Order: {structure.order || index + 1}</span>
                        {structure.content && (
                          <span className="text-green-600">Has Content</span>
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
                    onClick={() => confirmDelete(structure)}
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
              to={`/admin/add-structure/${courseId}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add First Structure
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && structureToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{structureToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setStructureToDelete(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteStructure(structureToDelete.id)}
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

export default CourseStructureManagement; 