import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/students/Navbar.jsx';
import HeroSection from '../../components/students/HeroSection.jsx';
import CoursesSection from '../../components/students/CoursesSection.jsx';
import TestimonialsSection from '../../components/students/TestimonialsSection.jsx';
import OurClients from '../../components/students/OurClients.jsx';
import FAQ from '../../components/students/FAQ.jsx';
import Footer from '../../components/students/Footer.jsx';
import AuthService from '../../services/auth.ts';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        // Check if user is authenticated
        if (!AuthService.isAuthenticated()) {
          setError('Please login to view courses');
          setLoading(false);
          return;
        }
        
        const response = await AuthService.getAllCourses({ limit: 3 });
        
        // Handle both possible response structures
        if (response.data && Array.isArray(response.data)) {
          setCourses(response.data);
        } else if (response.data && response.data.data) {
          setCourses(response.data.data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      
      {loading ? (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 text-blue-600 hover:text-blue-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CoursesSection courses={courses} />
      )}
      
      <OurClients />
      
      {/* <FAQ /> */}
      
      {/* <TestimonialsSection /> */}
      <Footer />
    </div>
  );
};

export default Home;
