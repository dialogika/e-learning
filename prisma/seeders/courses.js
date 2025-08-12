export async function seedCourses(prisma, users) {
  // Find admin user
  const adminUser = users.find(user => user.role === 'ADMIN');
  if (!adminUser) {
    throw new Error('Admin user not found');
  }

  // Course data
  const courseData = [
    {
      title: 'Mastering Public Speaking',
      description: 'Pelajari teknik berbicara di depan umum dengan percaya diri dan efektif. Kursus ini akan membantu Anda mengatasi rasa gugup dan mengembangkan keterampilan komunikasi yang kuat.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=600&q=80',
      instructor: 'Jane Doe',
      category: 'Communication',
      level: 'Beginner',
      duration: '8 weeks',
    },
    {
      title: 'Effective Communication Skills',
      description: 'Tingkatkan kemampuan komunikasi untuk presentasi, wawancara, dan interaksi sehari-hari. Pelajari teknik verbal dan non-verbal yang efektif.',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=600&q=80',
      instructor: 'John Smith',
      category: 'Communication',
      level: 'Intermediate',
      duration: '6 weeks',
    },
    {
      title: 'Overcoming Stage Fright',
      description: 'Atasi rasa gugup dan cemas saat tampil di depan banyak orang. Pelajari teknik relaksasi dan mindset yang tepat untuk mengatasi stage fright.',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=600&q=80',
      instructor: 'Emily Clark',
      category: 'Personal Development',
      level: 'Beginner',
      duration: '4 weeks',
    },
    {
      title: 'Persuasive Presentation Techniques',
      description: 'Deliver presentations that persuade and inspire. Master the art of storytelling and audience engagement.',
      image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=600&q=80',
      instructor: 'Michael Lee',
      category: 'Business',
      level: 'Advanced',
      duration: '7 weeks',
    },
    {
      title: 'Storytelling for Impact',
      description: 'Learn the art of storytelling to captivate your audience and make your message memorable.',
      image: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=facearea&w=600&q=80',
      instructor: 'Sarah Kim',
      category: 'Communication',
      level: 'Intermediate',
      duration: '5 weeks',
    },
    {
      title: 'Body Language for Speakers',
      description: 'Master non-verbal communication to enhance your presentations and build better connections with your audience.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=600&q=80',
      instructor: 'David Brown',
      category: 'Communication',
      level: 'Intermediate',
      duration: '4 weeks',
    },
  ];

  // Create courses
  const courses = [];
  for (const courseDataItem of courseData) {
    const course = await prisma.course.create({
      data: {
        ...courseDataItem,
        createdById: adminUser.id,
      },
    });
    courses.push(course);
  }

  return courses;
} 