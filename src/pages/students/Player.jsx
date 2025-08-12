import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/students/Navbar';
import Footer from '../../components/students/Footer';
import AuthService from '../../services/auth.ts';
import { useToast } from '../../context/ToastContext.jsx';

const Player = () => {
  const { courseId, structureId } = useParams();
  const navigate = useNavigate();
  const { showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [structure, setStructure] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, [courseId, structureId]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if user is authenticated
      if (!AuthService.isAuthenticated()) {
        setError('Please login to view course content');
        showError('Please login to view course content');
        setLoading(false);
        return;
      }

      // Fetch course details (structures included)
      const courseResponse = await AuthService.getCourseById(courseId);
      
      if (!courseResponse.success) {
        throw new Error('Failed to fetch course data');
      }
      
      const course = courseResponse.data;
      setCourse(course);
      
      // Find the specific structure from the course structures
      const structures = course.structures || [];
      const targetStructure = structures.find(s => s.id == structureId);
      
      if (!targetStructure) {
        setError('Structure not found');
        showError('Structure not found');
        setLoading(false);
        return;
      }
      
      setStructure(targetStructure);

    } catch (error) {
      console.error('Error fetching course data:', error);
      const errorMessage = error.message || 'Failed to load course content';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getVideoEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null;
    
    // YouTube URL patterns
    const youtubePatterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of youtubePatterns) {
      const match = videoUrl.match(pattern);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    
    // Vimeo URL patterns
    const vimeoPattern = /vimeo\.com\/(\d+)/;
    const vimeoMatch = videoUrl.match(vimeoPattern);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // Return original URL if no pattern matches
    return videoUrl;
  };

  const renderVideoPlayer = () => {
    if (!structure?.videoUrl) {
      return (
        <div className="w-full h-96 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <svg className="mx-auto h-16 w-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No video content available</p>
            <p className="text-gray-400">This lesson doesn't contain any video content.</p>
          </div>
        </div>
      );
    }

    const embedUrl = getVideoEmbedUrl(structure.videoUrl);
    
    if (embedUrl.includes('youtube.com/embed') || embedUrl.includes('player.vimeo.com')) {
      return (
        <iframe
          src={embedUrl}
          className="w-full h-96"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={structure.title}
        />
      );
    } else {
      return (
        <video
          className="w-full h-96"
          controls
          poster={course?.image}
        >
          <source src={structure.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="h-6 w-1/4 bg-gray-200 rounded mb-6" />
            <div className="w-full h-96 bg-gray-200 rounded" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Video</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            {error === 'Please login to view course content' ? (
              <div className="space-y-4">
                <p className="text-gray-500">You need to be logged in to view course content.</p>
                <a 
                  href="/login" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </a>
              </div>
            ) : (
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course || !structure) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Content Not Found</h1>
            <p className="text-gray-500">The requested course content could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/courses')}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Courses
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <button
                    onClick={() => navigate(`/courses/${courseId}`)}
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2"
                  >
                    {course.title}
                  </button>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{structure.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Video Player */}
        <div className="bg-black rounded-lg overflow-hidden shadow-lg">
          {renderVideoPlayer()}
        </div>

        {/* Content Info */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{structure.title}</h1>
          
          {/* Course Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Course Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Course:</span>
                <span className="ml-2 font-medium">{course.title}</span>
              </div>
              <div>
                <span className="text-gray-500">Lectures:</span>
                <span className="ml-2 font-medium">{structure.lectures}</span>
              </div>
              <div>
                <span className="text-gray-500">Duration:</span>
                <span className="ml-2 font-medium">{structure.duration}</span>
              </div>
              <div>
                <span className="text-gray-500">Instructor:</span>
                <span className="ml-2 font-medium">{course.createdBy?.name || 'Unknown'}</span>
              </div>
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 font-medium">{course.category || 'General'}</span>
              </div>
              <div>
                <span className="text-gray-500">Level:</span>
                <span className="ml-2 font-medium">{course.level || 'Beginner'}</span>
              </div>
            </div>
          </div>
          
          {/* Additional Resources */}
          {structure.pdfUrl && (
            <div className="mt-4">
              <a
                href={structure.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Player;
