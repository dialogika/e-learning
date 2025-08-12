import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users.js';
import { seedCourses } from './courses.js';
import { seedCourseStructures } from './courseStructures.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data in reverse order (due to foreign key constraints)
    console.log('🗑️  Clearing existing data...');
    await prisma.courseStructure.deleteMany();
    await prisma.course.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Data cleared successfully');

    // Seed data in order
    console.log('\n👥 Seeding users...');
    const users = await seedUsers(prisma);
    console.log(`✅ Created ${users.length} users`);

    console.log('\n📚 Seeding courses...');
    const courses = await seedCourses(prisma, users);
    console.log(`✅ Created ${courses.length} courses`);

    console.log('\n📖 Seeding course structures...');
    const structures = await seedCourseStructures(prisma, courses);
    console.log(`✅ Created ${structures.length} course structures`);

    // Summary
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Users created: ${users.length}`);
    console.log(`- Courses created: ${courses.length}`);
    console.log(`- Course structures created: ${structures.length}`);
    
    console.log('\n🔑 Admin credentials:');
    console.log('Email: admin@dialogika.com');
    console.log('Password: admin123');
    
    console.log('\n👤 Student credentials:');
    console.log('Email: student1@example.com');
    console.log('Password: student123');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Fatal error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 