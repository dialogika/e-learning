import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/students/Footer";
import AuthService from "../../services/auth.ts";
import { handleApiError } from "../../utils/apiErrorHandler.js";

// Custom Navbar for Course Details
const CourseDetailsNavbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Back Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/courses')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Courses
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/src/assets/dialogika_logo.png"
                alt="Dialogika"
              />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                Course Details
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
            <button
              onClick={() => navigate('/courses')}
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              All Courses
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [courseStructures, setCourseStructures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Check if user is authenticated
        if (!AuthService.isAuthenticated()) {
          setError('Please login to view course details');
          setLoading(false);
          return;
        }
        
        // Fetch course details (structures included)
        const courseResponse = await AuthService.getCourseById(id);
        const course = courseResponse.data;
        setCourse(course);
        setCourseStructures(course.structures || []);
      } catch (error) {
        setError(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourseData();
  }, [id]);

  if (loading) {
    // Skeleton UI
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 animate-pulse">
        <div className="h-8 w-2/3 bg-gray-200 rounded mb-4" />
        <div className="h-5 w-1/2 bg-gray-200 rounded mb-6" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <div className="h-6 w-40 bg-gray-200 rounded mb-3" />
            <div className="space-y-3 mb-6">
              <div className="h-12 w-full bg-gray-100 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded" />
              <div className="h-12 w-full bg-gray-100 rounded" />
            </div>
            <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="w-full md:w-96">
            <div className="h-56 w-full bg-gray-200 rounded mb-4" />
            <div className="h-8 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-1/3 bg-gray-200 rounded mb-4" />
            <div className="h-12 w-full bg-gray-200 rounded mb-4" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-100 rounded" />
              <div className="h-4 w-2/3 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <CourseDetailsNavbar />
        <div className="max-w-5xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            {error === 'Please login to view course details' ? (
              <div className="space-y-4">
                <p className="text-gray-500">You need to be logged in to view course details.</p>
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

  if (!course) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <CourseDetailsNavbar />
        <div className="max-w-5xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Course Not Found</h1>
            <p className="text-gray-500">The course you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <CourseDetailsNavbar />
      <section className="max-w-7xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-10">
        {/* Left: Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
            {/* Thumbnail */}
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="w-40 h-40 object-cover rounded-xl border-2 border-gray-200 shadow-lg"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                {course.title}
                {course.isPopular && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">Popular</span>
                )}
                {course.price === 0 && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">Free</span>
                )}
              </h1>
              <div className="text-lg text-gray-600 mb-4 leading-relaxed">{course.description}</div>
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
                <span className="text-gray-600">
                  By <span className="font-semibold text-gray-900">{course.instructor || course.createdBy?.name || 'Unknown'}</span>
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{course.category || 'General'}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{course.level || 'All Levels'}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{course.duration || 'Flexible'}</span>
                {course.price !== undefined && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 font-semibold">{course.price === 0 ? 'Free' : `Rp${course.price.toLocaleString()}`}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Course Structure */}
          <section className="mb-8">
            <h3 className="font-bold text-xl mb-4 text-gray-900">Course Structure</h3>
            <div className="space-y-3">
              {courseStructures && courseStructures.length > 0 ? (
                courseStructures.map((structure, idx) => (
                  <div
                    key={structure.id || idx}
                    className="flex items-center justify-between border border-gray-200 rounded-lg px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 text-lg">{structure.title}</span>
                      <div className="mt-1 text-gray-500 text-sm">
                        {structure.lectures ? `${structure.lectures} lectures - ` : ''}{structure.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {structure.videoUrl && (
                        <a
                          href={`/player/${course.id}/${structure.id}`}
                          className="text-blue-600 font-medium hover:text-blue-800 hover:underline px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          Watch Video
                        </a>
                      )}
                      {structure.pdfUrl && (
                        <a
                          href={structure.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 font-medium hover:text-blue-800 hover:underline px-3 py-1 rounded border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          Read PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center py-8">No structure available.</div>
              )}
            </div>
          </section>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="font-semibold text-xl mb-4 text-gray-900">Course Description</h2>
            <div className="text-gray-700 text-base leading-relaxed bg-gray-50 rounded-lg p-6">
              {course.description}
            </div>
          </div>
        </div>
        
        {/* Right: Info Card with Video */}
        <div className="w-full md:w-96">
          <div className="bg-white rounded-xl shadow-md border p-0 mb-6 overflow-hidden">
            <div className="w-full aspect-video bg-black">
              {courseStructures && courseStructures.length > 0 && courseStructures[0]?.videoUrl ? (
                <div className="w-full h-full">
                  {(() => {
                    const firstStructure = courseStructures[0];
                    const videoUrl = firstStructure.videoUrl;
                    
                    // Check if it's a YouTube URL
                    const youtubePattern = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
                    const match = videoUrl.match(youtubePattern);
                    
                    if (match) {
                      const embedUrl = `https://www.youtube.com/embed/${match[1]}`;
                      return (
                        <iframe
                          src={embedUrl}
                          title="Course Preview"
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      );
                    }
                    
                    // For other video URLs or local files
                    return (
                      <video
                        controls
                        className="w-full h-full"
                        poster={course?.image}
                      >
                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />
                        <source src={videoUrl} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    );
                  })()}
                </div>
              ) : (
                <div className="w-full h-56 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No Preview Available</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                <span>Category: {course.category || 'General'}</span>
                <span>Level: {course.level || 'All Levels'}</span>
                <span>Duration: {course.duration || 'Flexible'}</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg mb-4">
                Enroll Now
              </button>
              <div>
                <h3 className="font-semibold mb-2">Course Structure</h3>
                <div className="text-gray-700 text-sm">
                  <p>This course contains {courseStructures?.length || 0} sections with comprehensive learning materials.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseDetails;
