# Modular Seeder Structure

## Overview

Seeder telah diorganisir ulang menjadi struktur modular yang lebih maintainable dan mudah dikelola. Setiap model memiliki file seeder terpisah.

## 📁 Struktur Folder

```
prisma/seeders/
├── index.js              # Main orchestrator
├── config.js             # Configuration & helpers
├── users.js              # User seeder
├── courses.js            # Course seeder
├── courseStructures.js   # Course structure seeder
└── README.md             # This file
```

## 🔧 File Descriptions

### `index.js`
- **Main orchestrator** yang menjalankan semua seeder
- Mengatur urutan seeding (users → courses → structures)
- Menangani error handling dan cleanup
- Menampilkan summary hasil seeding

### `config.js`
- **Configuration constants** untuk passwords, URLs, categories
- **Helper functions** untuk generate data
- **Centralized settings** yang bisa digunakan di semua seeder

### `users.js`
- **User data seeder**
- Membuat admin dan student users
- Password hashing dengan bcrypt
- Avatar assignment

### `courses.js`
- **Course data seeder**
- Membuat 6 courses dengan data lengkap
- Menggunakan admin user sebagai creator
- Category dan level assignment

### `courseStructures.js`
- **Course structure seeder**
- Membuat structures untuk setiap course
- Mapping berdasarkan course title
- Video dan PDF URL assignment

## 🚀 Cara Menjalankan

```bash
# Jalankan seeder modular
npm run db:seed

# Atau langsung
node prisma/seeders/index.js
```

## 📊 Data yang Dibuat

### Users (3)
- 1 Admin user
- 2 Student users

### Courses (6)
- Mastering Public Speaking
- Effective Communication Skills
- Overcoming Stage Fright
- Persuasive Presentation Techniques
- Storytelling for Impact
- Body Language for Speakers

### Course Structures (18)
- 2-4 structures per course
- Video dan PDF materials
- Durasi dan lecture count yang bervariasi

## 🔧 Customization

### Menambah User Baru
Edit `users.js`:
```javascript
const userData = [
  // ... existing users
  {
    email: 'newuser@example.com',
    password: studentPassword,
    name: 'New User',
    role: 'STUDENT',
    avatar: SEEDER_CONFIG.AVATARS.STUDENT_1,
  },
];
```

### Menambah Course Baru
Edit `courses.js`:
```javascript
const courseData = [
  // ... existing courses
  {
    title: 'New Course',
    description: 'Course description',
    image: 'https://example.com/image.jpg',
    instructor: 'Instructor Name',
    category: SEEDER_CONFIG.CATEGORIES.COMMUNICATION,
    level: SEEDER_CONFIG.LEVELS.BEGINNER,
    duration: '4 weeks',
  },
];
```

### Menambah Course Structure
Edit `courseStructures.js`:
```javascript
const structureDataMap = {
  // ... existing courses
  'New Course': [
    {
      title: 'New Structure',
      lectures: 3,
      duration: '2 hours',
      order: 1,
      videoUrl: SEEDER_CONFIG.VIDEO_URLS.DEFAULT,
      pdfUrl: null,
    },
  ],
};
```

## 🎯 Benefits

### ✅ Modularity
- Setiap model memiliki file terpisah
- Mudah maintain dan update
- Clear separation of concerns

### ✅ Reusability
- Configuration centralized
- Helper functions bisa digunakan ulang
- Consistent data patterns

### ✅ Scalability
- Mudah menambah model baru
- Mudah menambah data baru
- Flexible structure

### ✅ Maintainability
- Code lebih organized
- Easy to debug
- Clear dependencies

## 🔐 Security

- Passwords di-hash menggunakan bcrypt
- Salt rounds: 10
- Secure password storage
- Environment-based configuration

## 📝 Notes

- Seeder akan menghapus data existing sebelum membuat data baru
- Urutan seeding penting karena foreign key constraints
- Configuration bisa disesuaikan di `config.js`
- Helper functions tersedia untuk generate data dinamis

---

**Seeder modular siap digunakan!** 🎉 