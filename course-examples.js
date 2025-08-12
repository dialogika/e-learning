/**
 * 📚 Course Data Examples
 * Complete examples for fetching course data with structures
 */

import dialogikaAPI from './frontend-api-helper.js';

// ===== EXAMPLE 1: Get Course with Structures =====

/**
 * Get single course with all its structures
 */
async function getCourseWithStructures(courseId) {
  try {
    const response = await dialogikaAPI.getCourseById(courseId);
    
    if (response.success) {
      const course = response.data;
      console.log('Course:', course.title);
      console.log('Description:', course.description);
      console.log('Instructor:', course.instructor);
      console.log('Category:', course.category);
      console.log('Level:', course.level);
      console.log('Duration:', course.duration);
      
      console.log('\n📖 Course Structures:');
      course.structures.forEach((structure, index) => {
        console.log(`${index + 1}. ${structure.title}`);
        console.log(`   Lectures: ${structure.lectures}`);
        console.log(`   Duration: ${structure.duration}`);
        console.log(`   Order: ${structure.order}`);
        if (structure.videoUrl) console.log(`   Video: ${structure.videoUrl}`);
        if (structure.pdfUrl) console.log(`   PDF: ${structure.pdfUrl}`);
        console.log('');
      });
      
      return course;
    }
  } catch (error) {
    console.error('Error fetching course:', error);
  }
}

// ===== EXAMPLE 2: Get All Courses with Structures =====

/**
 * Get all courses with their structures
 */
async function getAllCoursesWithStructures(params = {}) {
  try {
    const response = await dialogikaAPI.getAllCourses(params);
    
    if (response.success) {
      console.log(`📚 Found ${response.data.length} courses:`);
      
      response.data.forEach((course, index) => {
        console.log(`\n${index + 1}. ${course.title}`);
        console.log(`   Instructor: ${course.instructor}`);
        console.log(`   Category: ${course.category}`);
        console.log(`   Level: ${course.level}`);
        console.log(`   Duration: ${course.duration}`);
        console.log(`   Structures: ${course.structures.length} chapters`);
        
        // Show first few structures
        course.structures.slice(0, 3).forEach((structure, sIndex) => {
          console.log(`   ${sIndex + 1}. ${structure.title} (${structure.duration})`);
        });
        
        if (course.structures.length > 3) {
          console.log(`   ... and ${course.structures.length - 3} more chapters`);
        }
      });
      
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
}

// ===== EXAMPLE 3: React Hook for Course with Structures =====

import { useState, useEffect } from 'react';

export const useCourseWithStructures = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dialogikaAPI.getCourseById(courseId);
      if (response.success) {
        setCourse(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { course, loading, error, refetch: fetchCourse };
};

// ===== EXAMPLE 4: React Component for Course Detail =====

export const CourseDetailComponent = ({ courseId }) => {
  const { course, loading, error } = useCourseWithStructures(courseId);

  if (loading) return <div>Loading course...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-detail">
      {/* Course Header */}
      <div className="course-header">
        <img src={course.image} alt={course.title} className="course-image" />
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="description">{course.description}</p>
          <div className="course-meta">
            <span>Instructor: {course.instructor}</span>
            <span>Category: {course.category}</span>
            <span>Level: {course.level}</span>
            <span>Duration: {course.duration}</span>
          </div>
        </div>
      </div>

      {/* Course Structures */}
      <div className="course-structures">
        <h2>Course Content ({course.structures.length} chapters)</h2>
        
        <div className="structures-list">
          {course.structures.map((structure, index) => (
            <div key={structure.id} className="structure-item">
              <div className="structure-header">
                <span className="structure-number">{index + 1}</span>
                <h3>{structure.title}</h3>
                <span className="structure-duration">{structure.duration}</span>
              </div>
              
              <div className="structure-details">
                <p>Lectures: {structure.lectures}</p>
                {structure.videoUrl && (
                  <a href={structure.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                )}
                {structure.pdfUrl && (
                  <a href={structure.pdfUrl} target="_blank" rel="noopener noreferrer">
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== EXAMPLE 5: Course List Component =====

export const CourseListComponent = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dialogikaAPI.getAllCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading courses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="courses-grid">
      {courses.map(course => (
        <div key={course.id} className="course-card">
          <img src={course.image} alt={course.title} />
          <div className="course-content">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-meta">
              <span>Instructor: {course.instructor}</span>
              <span>Category: {course.category}</span>
              <span>Level: {course.level}</span>
              <span>Duration: {course.duration}</span>
            </div>
            <div className="course-structures-summary">
              <strong>{course.structures.length} chapters</strong>
              <ul>
                {course.structures.slice(0, 3).map(structure => (
                  <li key={structure.id}>{structure.title}</li>
                ))}
                {course.structures.length > 3 && (
                  <li>... and {course.structures.length - 3} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ===== EXAMPLE 6: Postman Request Examples =====

/**
 * Postman Request Examples
 */

// Get Course with Structures
const postmanGetCourse = {
  method: 'GET',
  url: '{{base_url}}/api/courses/{{course_id}}',
  headers: {
    'Authorization': 'Bearer {{user_token}}'
  }
};

// Get All Courses with Structures
const postmanGetAllCourses = {
  method: 'GET',
  url: '{{base_url}}/api/courses?page=1&limit=10',
  headers: {
    'Authorization': 'Bearer {{user_token}}'
  }
};

// ===== EXAMPLE 7: Data Processing Examples =====

/**
 * Process course data for different use cases
 */
function processCourseData(course) {
  // Calculate total duration
  const totalDuration = course.structures.reduce((total, structure) => {
    const hours = parseInt(structure.duration.match(/(\d+)/)[1]);
    return total + hours;
  }, 0);

  // Calculate total lectures
  const totalLectures = course.structures.reduce((total, structure) => {
    return total + structure.lectures;
  }, 0);

  // Group structures by type (video, pdf, both)
  const structureTypes = course.structures.reduce((acc, structure) => {
    if (structure.videoUrl && structure.pdfUrl) {
      acc.both++;
    } else if (structure.videoUrl) {
      acc.video++;
    } else if (structure.pdfUrl) {
      acc.pdf++;
    } else {
      acc.none++;
    }
    return acc;
  }, { video: 0, pdf: 0, both: 0, none: 0 });

  return {
    ...course,
    stats: {
      totalDuration: `${totalDuration} hours`,
      totalLectures,
      structureTypes
    }
  };
}

// ===== EXAMPLE 8: Search and Filter Functions =====

/**
 * Search courses by structure content
 */
async function searchCoursesByStructure(searchTerm) {
  try {
    const response = await dialogikaAPI.getAllCourses({ search: searchTerm });
    
    if (response.success) {
      // Filter courses that have structures matching the search term
      const filteredCourses = response.data.filter(course => 
        course.structures.some(structure => 
          structure.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          structure.videoUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          structure.pdfUrl?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      
      return filteredCourses;
    }
  } catch (error) {
    console.error('Error searching courses:', error);
  }
}

// ===== EXAMPLE 9: Course Progress Tracking =====

/**
 * Track course progress for a user
 */
function calculateCourseProgress(course, completedStructures = []) {
  const totalStructures = course.structures.length;
  const completedCount = completedStructures.length;
  const progressPercentage = (completedCount / totalStructures) * 100;

  const nextStructure = course.structures.find(structure => 
    !completedStructures.includes(structure.id)
  );

  return {
    courseId: course.id,
    courseTitle: course.title,
    totalStructures,
    completedCount,
    progressPercentage: Math.round(progressPercentage),
    nextStructure,
    isCompleted: completedCount === totalStructures
  };
}

// ===== EXAMPLE 10: Export Course Data =====

/**
 * Export course data to different formats
 */
function exportCourseData(course, format = 'json') {
  switch (format) {
    case 'json':
      return JSON.stringify(course, null, 2);
    
    case 'csv':
      const csvHeaders = 'Title,Lectures,Duration,Video URL,PDF URL,Order\n';
      const csvRows = course.structures.map(structure => 
        `"${structure.title}",${structure.lectures},"${structure.duration}","${structure.videoUrl || ''}","${structure.pdfUrl || ''}",${structure.order}`
      ).join('\n');
      return csvHeaders + csvRows;
    
    case 'markdown':
      let markdown = `# ${course.title}\n\n`;
      markdown += `**Instructor:** ${course.instructor}\n`;
      markdown += `**Category:** ${course.category}\n`;
      markdown += `**Level:** ${course.level}\n`;
      markdown += `**Duration:** ${course.duration}\n\n`;
      markdown += `## Course Content\n\n`;
      
      course.structures.forEach((structure, index) => {
        markdown += `### ${index + 1}. ${structure.title}\n`;
        markdown += `- **Lectures:** ${structure.lectures}\n`;
        markdown += `- **Duration:** ${structure.duration}\n`;
        if (structure.videoUrl) markdown += `- **Video:** [Watch](${structure.videoUrl})\n`;
        if (structure.pdfUrl) markdown += `- **PDF:** [Download](${structure.pdfUrl})\n`;
        markdown += '\n';
      });
      
      return markdown;
    
    default:
      return course;
  }
}

// ===== USAGE EXAMPLES =====

// Example 1: Get single course
getCourseWithStructures('cmdl3cr780007gu7seafw738l');

// Example 2: Get all courses
getAllCoursesWithStructures({ page: 1, limit: 10 });

// Example 3: Search courses
searchCoursesByStructure('javascript');

// Example 4: Process course data
const course = await getCourseWithStructures('cmdl3cr780007gu7seafw738l');
const processedCourse = processCourseData(course);

// Example 5: Calculate progress
const progress = calculateCourseProgress(course, ['structure_1', 'structure_2']);

// Example 6: Export data
const markdownExport = exportCourseData(course, 'markdown'); 