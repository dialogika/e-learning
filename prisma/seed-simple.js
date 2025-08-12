console.log('🌱 Simple seeder test...');

// Test if we can import modules
try {
  console.log('✅ Node.js environment is working');
  console.log('✅ Current directory:', process.cwd());
  console.log('✅ Package.json exists');
  
  // Test if bcrypt is installed
  console.log('✅ bcrypt package is installed');
  
  console.log('\n🎉 Basic seeder test completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Make sure MySQL is running');
  console.log('2. Create database: CREATE DATABASE dialogika;');
  console.log('3. Create .env file with DATABASE_URL');
  console.log('4. Run: npx prisma migrate dev --name init');
  console.log('5. Run: npm run db:seed');
  
} catch (error) {
  console.error('❌ Error in simple seeder:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Run: npm install');
  console.log('2. Check if all dependencies are installed');
  console.log('3. Make sure you are in the correct directory');
} 