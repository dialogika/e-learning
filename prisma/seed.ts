import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.courseStructure.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@dialogika.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      avatar: 'https://via.placeholder.com/150/FF6B6B/FFFFFF?text=Admin',
    },
  });

  // Create student users
  console.log('👥 Creating student users...');
  const studentPassword = await bcrypt.hash('student123', 10);
  
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        password: studentPassword,
        name: 'John Doe',
        role: 'STUDENT',
        avatar: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=John',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        password: studentPassword,
        name: 'Jane Smith',
        role: 'STUDENT',
        avatar: 'https://via.placeholder.com/150/61DAFB/FFFFFF?text=Jane',
      },
    }),
    prisma.user.create({
      data: {
        email: 'mike.wilson@example.com',
        password: studentPassword,
        name: 'Mike Wilson',
        role: 'STUDENT',
        avatar: 'https://via.placeholder.com/150/50C878/FFFFFF?text=Mike',
      },
    }),
  ]);

  // Create courses
  console.log('📚 Creating courses...');
  const courses = await Promise.all([
    prisma.course.create({
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
    }),
    prisma.course.create({
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
    }),
    prisma.course.create({
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
    }),
    prisma.course.create({
      data: {
        title: 'UI/UX Design Principles',
        description: 'Learn the fundamentals of user interface and user experience design. Create beautiful and functional digital products.',
        image: 'https://via.placeholder.com/400x250/9B59B6/FFFFFF?text=UI+UX',
        instructor: 'Sarah Chen',
        category: 'Design',
        level: 'Beginner',
        duration: '6 weeks',
        createdById: admin.id,
      },
    }),
    prisma.course.create({
      data: {
        title: 'Mobile App Development',
        description: 'Build mobile applications using React Native. Learn to create cross-platform apps for iOS and Android.',
        image: 'https://via.placeholder.com/400x250/2ECC71/FFFFFF?text=Mobile+App',
        instructor: 'David Kim',
        category: 'Programming',
        level: 'Intermediate',
        duration: '14 weeks',
        createdById: admin.id,
      },
    }),
  ]);

  // Create course structures for Web Development course
  console.log('🏗️ Creating course structures...');
  await Promise.all([
    // Web Development Course Structures
    prisma.courseStructure.create({
      data: {
        title: 'HTML Basics',
        lectures: 5,
        duration: '2 hours',
        videoUrl: 'https://example.com/videos/html-basics.mp4',
        pdfUrl: 'https://example.com/pdfs/html-basics.pdf',
        order: 1,
        courseId: courses[0].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'CSS Styling',
        lectures: 7,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/css-styling.mp4',
        pdfUrl: 'https://example.com/pdfs/css-styling.pdf',
        order: 2,
        courseId: courses[0].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'JavaScript Fundamentals',
        lectures: 10,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/javascript-fundamentals.mp4',
        pdfUrl: 'https://example.com/pdfs/javascript-fundamentals.pdf',
        order: 3,
        courseId: courses[0].id,
      },
    }),

    // React Course Structures
    prisma.courseStructure.create({
      data: {
        title: 'React Hooks Deep Dive',
        lectures: 8,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/react-hooks.mp4',
        pdfUrl: 'https://example.com/pdfs/react-hooks.pdf',
        order: 1,
        courseId: courses[1].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Context API and State Management',
        lectures: 6,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/context-api.mp4',
        pdfUrl: 'https://example.com/pdfs/context-api.pdf',
        order: 2,
        courseId: courses[1].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Advanced Patterns and Best Practices',
        lectures: 12,
        duration: '6 hours',
        videoUrl: 'https://example.com/videos/react-patterns.mp4',
        pdfUrl: 'https://example.com/pdfs/react-patterns.pdf',
        order: 3,
        courseId: courses[1].id,
      },
    }),

    // Data Science Course Structures
    prisma.courseStructure.create({
      data: {
        title: 'Python for Data Science',
        lectures: 6,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/python-data.mp4',
        pdfUrl: 'https://example.com/pdfs/python-data.pdf',
        order: 1,
        courseId: courses[2].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Statistical Analysis',
        lectures: 8,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/statistics.mp4',
        pdfUrl: 'https://example.com/pdfs/statistics.pdf',
        order: 2,
        courseId: courses[2].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Data Visualization',
        lectures: 5,
        duration: '2.5 hours',
        videoUrl: 'https://example.com/videos/data-viz.mp4',
        pdfUrl: 'https://example.com/pdfs/data-viz.pdf',
        order: 3,
        courseId: courses[2].id,
      },
    }),

    // UI/UX Course Structures
    prisma.courseStructure.create({
      data: {
        title: 'Design Principles',
        lectures: 4,
        duration: '2 hours',
        videoUrl: 'https://example.com/videos/design-principles.mp4',
        pdfUrl: 'https://example.com/pdfs/design-principles.pdf',
        order: 1,
        courseId: courses[3].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'User Research Methods',
        lectures: 6,
        duration: '3 hours',
        videoUrl: 'https://example.com/videos/user-research.mp4',
        pdfUrl: 'https://example.com/pdfs/user-research.pdf',
        order: 2,
        courseId: courses[3].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Prototyping and Testing',
        lectures: 5,
        duration: '2.5 hours',
        videoUrl: 'https://example.com/videos/prototyping.mp4',
        pdfUrl: 'https://example.com/pdfs/prototyping.pdf',
        order: 3,
        courseId: courses[3].id,
      },
    }),

    // Mobile App Course Structures
    prisma.courseStructure.create({
      data: {
        title: 'React Native Setup',
        lectures: 3,
        duration: '1.5 hours',
        videoUrl: 'https://example.com/videos/react-native-setup.mp4',
        pdfUrl: 'https://example.com/pdfs/react-native-setup.pdf',
        order: 1,
        courseId: courses[4].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'Navigation and Routing',
        lectures: 7,
        duration: '3.5 hours',
        videoUrl: 'https://example.com/videos/navigation.mp4',
        pdfUrl: 'https://example.com/pdfs/navigation.pdf',
        order: 2,
        courseId: courses[4].id,
      },
    }),
    prisma.courseStructure.create({
      data: {
        title: 'State Management in React Native',
        lectures: 8,
        duration: '4 hours',
        videoUrl: 'https://example.com/videos/state-management.mp4',
        pdfUrl: 'https://example.com/pdfs/state-management.pdf',
        order: 3,
        courseId: courses[4].id,
      },
    }),
  ]);

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Seeded Data Summary:');
  console.log(`👤 Users: ${1 + students.length} (1 Admin, ${students.length} Students)`);
  console.log(`📚 Courses: ${courses.length}`);
  console.log(`🏗️ Course Structures: ${15} (3 per course)`);
  
  console.log('\n🔑 Test Credentials:');
  console.log('Admin: admin@dialogika.com / admin123');
  console.log('Student: john.doe@example.com / student123');
  console.log('Student: jane.smith@example.com / student123');
  console.log('Student: mike.wilson@example.com / student123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 