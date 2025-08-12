const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.courseStructure.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@dialogika.com',
      password: adminPassword,
      role: 'ADMIN',
      avatar: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=A',
    },
  });

  // Create student user
  const studentPassword = await bcrypt.hash('student123', 12);
  const student = await prisma.user.create({
    data: {
      name: 'Student User',
      email: 'student@dialogika.com',
      password: studentPassword,
      role: 'STUDENT',
      avatar: 'https://via.placeholder.com/150/50C878/FFFFFF?text=S',
    },
  });

  console.log('👥 Created users');

  // Create sample courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Introduction to Web Development',
      description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive course covers everything from basic markup to modern web applications.',
      image: 'https://via.placeholder.com/400x250/4A90E2/FFFFFF?text=Web+Dev',
      instructor: 'John Doe',
      category: 'Programming',
      level: 'Beginner',
      duration: '8 weeks',
      createdById: admin.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Advanced React Development',
      description: 'Master React with hooks, context, and advanced patterns. Build scalable applications with modern React best practices.',
      image: 'https://via.placeholder.com/400x250/61DAFB/FFFFFF?text=React',
      instructor: 'Jane Smith',
      category: 'Programming',
      level: 'Advanced',
      duration: '10 weeks',
      createdById: admin.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Data Science Fundamentals',
      description: 'Introduction to data science concepts, Python programming, and statistical analysis. Perfect for beginners in the field.',
      image: 'https://via.placeholder.com/400x250/FF6B6B/FFFFFF?text=Data+Science',
      instructor: 'Mike Johnson',
      category: 'Data Science',
      level: 'Intermediate',
      duration: '12 weeks',
      createdById: admin.id,
    },
  });

  console.log('📚 Created courses');

  // Create course structures for course 1
  await prisma.courseStructure.createMany({
    data: [
      {
        title: 'HTML Basics',
        lectures: 5,
        duration: '2 hours',
        videoUrl: 'https://example.com/videos/html-basics.mp4',
        pdfUrl: 'https://example.com/pdfs/html-basics.pdf',
        order: 1,
        courseId: course1.id,
      },
      {
        title: 'CSS Styling',
        lectures: 7,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/css-styling.mp4',
        pdfUrl: 'https://example.com/pdfs/css-styling.pdf',
        order: 2,
        courseId: course1.id,
      },
      {
        title: 'JavaScript Fundamentals',
        lectures: 10,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/javascript-fundamentals.mp4',
        pdfUrl: 'https://example.com/pdfs/javascript-fundamentals.pdf',
        order: 3,
        courseId: course1.id,
      },
    ],
  });

  // Create course structures for course 2
  await prisma.courseStructure.createMany({
    data: [
      {
        title: 'React Hooks Deep Dive',
        lectures: 8,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/react-hooks.mp4',
        pdfUrl: 'https://example.com/pdfs/react-hooks.pdf',
        order: 1,
        courseId: course2.id,
      },
      {
        title: 'Context API and State Management',
        lectures: 6,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/context-api.mp4',
        pdfUrl: 'https://example.com/pdfs/context-api.pdf',
        order: 2,
        courseId: course2.id,
      },
      {
        title: 'Advanced Patterns and Best Practices',
        lectures: 12,
        duration: '6 hours',
        videoUrl: 'https://example.com/videos/react-patterns.mp4',
        pdfUrl: 'https://example.com/pdfs/react-patterns.pdf',
        order: 3,
        courseId: course2.id,
      },
    ],
  });

  // Create course structures for course 3
  await prisma.courseStructure.createMany({
    data: [
      {
        title: 'Python for Data Science',
        lectures: 6,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/python-data.mp4',
        pdfUrl: 'https://example.com/pdfs/python-data.pdf',
        order: 1,
        courseId: course3.id,
      },
      {
        title: 'Statistical Analysis',
        lectures: 8,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/statistics.mp4',
        pdfUrl: 'https://example.com/pdfs/statistics.pdf',
        order: 2,
        courseId: course3.id,
      },
      {
        title: 'Data Visualization',
        lectures: 5,
        duration: '2.5 hours',
        videoUrl: 'https://example.com/videos/data-viz.mp4',
        pdfUrl: 'https://example.com/pdfs/data-viz.pdf',
        order: 3,
        courseId: course3.id,
      },
    ],
  });

  console.log('📖 Created course structures');

  console.log('✅ Database seeding completed!');
  console.log('\n📋 Sample Data:');
  console.log(`👤 Admin: admin@dialogika.com / admin123`);
  console.log(`👤 Student: student@dialogika.com / student123`);
  console.log(`📚 Courses: ${course1.title}, ${course2.title}, ${course3.title}`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 