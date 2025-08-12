// Seeder Configuration
export const SEEDER_CONFIG = {
  // Password settings
  PASSWORDS: {
    ADMIN: 'admin123',
    STUDENT: 'student123',
    SALT_ROUNDS: 10,
  },

  // Default avatars
  AVATARS: {
    ADMIN: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    STUDENT_1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    STUDENT_2: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },

  // Video URLs (placeholder)
  VIDEO_URLS: {
    DEFAULT: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },

  // PDF URLs (placeholder)
  PDF_URLS: {
    SPEECH_STRUCTURE: 'https://example.com/speech-structure.pdf',
    NONVERBAL_GUIDE: 'https://example.com/nonverbal-guide.pdf',
    STAGE_FRIGHT_GUIDE: 'https://example.com/stage-fright-guide.pdf',
    MENTAL_PREP: 'https://example.com/mental-prep.pdf',
    AUDIENCE_ANALYSIS: 'https://example.com/audience-analysis.pdf',
    STORY_STRUCTURE: 'https://example.com/story-structure.pdf',
    EMOTIONAL_CONNECTION: 'https://example.com/emotional-connection.pdf',
    GESTURES_GUIDE: 'https://example.com/gestures-guide.pdf',
    QA_HANDLING: 'https://example.com/qa-handling.pdf',
  },

  // Course categories
  CATEGORIES: {
    COMMUNICATION: 'Communication',
    PERSONAL_DEVELOPMENT: 'Personal Development',
    BUSINESS: 'Business',
  },

  // Course levels
  LEVELS: {
    BEGINNER: 'Beginner',
    INTERMEDIATE: 'Intermediate',
    ADVANCED: 'Advanced',
  },
};

// Helper functions
export const helpers = {
  // Generate random duration between min and max hours
  randomDuration: (minHours = 1, maxHours = 4) => {
    const hours = Math.floor(Math.random() * (maxHours - minHours + 1)) + minHours;
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  },

  // Generate random lecture count
  randomLectures: (min = 1, max = 5) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Check if environment is development
  isDevelopment: () => {
    return process.env.NODE_ENV === 'development';
  },
}; 