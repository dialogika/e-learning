import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBarEdemy from '../../components/learning/SearchBarEdemy';
import CourseCardEdemy from '../../components/learning/CourseCardEdemy';
import Footer from '../../components/students/Footer';
import AuthService from '../../services/auth.ts';
import { handleApiError } from '../../utils/apiErrorHandler.js';

// Custom Navbar for Course List
const CourseListNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/src/assets/dialogika_logo.png"
                alt="Dialogika"
              />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                All Courses
              </span>
            </div>
          </div>

          {/* Right side - could add additional actions here */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CourseList = () => {
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCourses();
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    console.log('Search term changed:', term);
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setSearchLoading(true);
      setError(null);
      
      // Check if user is authenticated
      if (!AuthService.isAuthenticated()) {
        setError('Please login to view courses');
        setLoading(false);
        setSearchLoading(false);
        return;
      }
      
      const params = {
        page: currentPage,
        limit: 12,
        search: searchTerm || undefined
      };
      
      console.log('Fetching courses with params:', params);
      
      const response = await AuthService.getAllCourses(params);
      
      // Debug: Log the response structure
      console.log('API Response:', response);
      console.log('Response data:', response.data);
      
      // Handle both possible response structures
      if (response.data && Array.isArray(response.data)) {
        // Direct array response
        setCourses(response.data);
        setTotalPages(1);
      } else if (response.data && response.data.data) {
        // Paginated response
        setCourses(response.data.data);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setCourses([]);
        setTotalPages(1);
      }
      
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(handleApiError(error));
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <CourseListNavbar />
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">Course List</h1>
            <div className="text-gray-400 text-sm">Home / Course List</div>
            {searchTerm && (
              <div className="mt-2 text-sm text-blue-600">
                Searching for: "{searchTerm}"
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <SearchBarEdemy onSearch={handleSearch} loading={searchLoading} />
          </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading courses</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  {error === 'Please login to view courses' ? (
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md"
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      onClick={fetchCourses}
                      className="bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium px-3 py-1 rounded-md"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md w-full max-w-xs min-h-[340px] flex flex-col h-full overflow-hidden border mx-auto animate-pulse">
                <div className="w-full h-40 bg-gray-200" />
                <div className="p-4 flex flex-col flex-1">
                  <div className="h-6 w-2/3 bg-gray-200 rounded mb-1 min-h-[48px]" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded mb-1" />
                  <div className="flex items-center gap-1 mb-2">
                    <div className="h-4 w-12 bg-gray-200 rounded" />
                    <div className="h-4 w-8 bg-gray-100 rounded ml-2" />
                  </div>
                  <div className="flex-1" />
                  <div className="h-4 w-3/4 bg-gray-100 rounded mt-2 min-h-[40px]" />
                </div>
              </div>
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCardEdemy 
                key={course.id} 
                id={course.id}
                image={course.image || 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=600&q=80'}
                title={course.title}
                instructor={course.instructor || course.createdBy?.name || 'Unknown'}
                description={course.description}
                price={0} // Courses are free for now
                category={course.category}
                level={course.level}
                duration={course.duration}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No courses found' : 'No courses available'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? `No courses match "${searchTerm}". Try different keywords or browse all courses.`
                    : 'No courses are currently available. Please check back later.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear search
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {!loading && courses.length > 0 && totalPages > 1 && (
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
      </section>
      <Footer />
    </div>
  );
};

export default CourseList;
