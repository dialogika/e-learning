export async function seedCourseStructures(prisma, courses) {
  // Course structure data mapped to course titles
  const structureDataMap = {
    'Mastering Public Speaking': [
      {
        title: 'Introduction to Public Speaking',
        lectures: 3,
        duration: '2 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Speech Structure and Organization',
        lectures: 4,
        duration: '3 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/speech-structure.pdf',
      },
      {
        title: 'Voice Control and Delivery',
        lectures: 3,
        duration: '2.5 hours',
        order: 3,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Handling Q&A Sessions',
        lectures: 2,
        duration: '1.5 hours',
        order: 4,
        videoUrl: null,
        pdfUrl: 'https://example.com/qa-handling.pdf',
      },
    ],
    'Effective Communication Skills': [
      {
        title: 'Verbal Communication Basics',
        lectures: 3,
        duration: '2 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Non-verbal Communication',
        lectures: 4,
        duration: '3 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/nonverbal-guide.pdf',
      },
      {
        title: 'Active Listening Skills',
        lectures: 2,
        duration: '1.5 hours',
        order: 3,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
    ],
    'Overcoming Stage Fright': [
      {
        title: 'Understanding Stage Fright',
        lectures: 2,
        duration: '1.5 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/stage-fright-guide.pdf',
      },
      {
        title: 'Breathing and Relaxation Techniques',
        lectures: 3,
        duration: '2 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Mental Preparation Strategies',
        lectures: 2,
        duration: '1.5 hours',
        order: 3,
        videoUrl: null,
        pdfUrl: 'https://example.com/mental-prep.pdf',
      },
    ],
    'Persuasive Presentation Techniques': [
      {
        title: 'The Art of Storytelling',
        lectures: 4,
        duration: '3 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Audience Analysis',
        lectures: 3,
        duration: '2.5 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/audience-analysis.pdf',
      },
      {
        title: 'Persuasive Language Techniques',
        lectures: 3,
        duration: '2 hours',
        order: 3,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
    ],
    'Storytelling for Impact': [
      {
        title: 'Story Structure Fundamentals',
        lectures: 3,
        duration: '2 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/story-structure.pdf',
      },
      {
        title: 'Character Development',
        lectures: 2,
        duration: '1.5 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Emotional Connection',
        lectures: 3,
        duration: '2 hours',
        order: 3,
        videoUrl: null,
        pdfUrl: 'https://example.com/emotional-connection.pdf',
      },
    ],
    'Body Language for Speakers': [
      {
        title: 'Posture and Stance',
        lectures: 2,
        duration: '1.5 hours',
        order: 1,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
      {
        title: 'Hand Gestures and Movement',
        lectures: 3,
        duration: '2 hours',
        order: 2,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: 'https://example.com/gestures-guide.pdf',
      },
      {
        title: 'Eye Contact and Facial Expressions',
        lectures: 2,
        duration: '1.5 hours',
        order: 3,
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        pdfUrl: null,
      },
    ],
  };

  // Create course structures
  const structures = [];
  for (const course of courses) {
    const courseStructures = structureDataMap[course.title] || [];
    
    for (const structureData of courseStructures) {
      const structure = await prisma.courseStructure.create({
        data: {
          ...structureData,
          courseId: course.id,
        },
      });
      structures.push(structure);
    }
  }

  return structures;
} 