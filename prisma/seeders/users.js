import bcrypt from 'bcrypt';

export async function seedUsers(prisma) {
  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  // User data
  const userData = [
    {
      email: 'admin@dialogika.com',
      password: adminPassword,
      name: 'Admin Dialogika',
      role: 'ADMIN',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    {
      email: 'student1@example.com',
      password: studentPassword,
      name: 'John Doe',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      email: 'student2@example.com',
      password: studentPassword,
      name: 'Jane Smith',
      role: 'STUDENT',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  ];

  // Create users
  const users = [];
  for (const userDataItem of userData) {
    const user = await prisma.user.create({
      data: userDataItem,
    });
    users.push(user);
  }

  return users;
} 