# Setup Instructions - Database & Seeder

## Prerequisites

1. **MySQL Server** - Pastikan MySQL server sudah berjalan
2. **Node.js** - Versi 18 atau lebih tinggi
3. **npm** - Package manager

## Step 1: Database Setup

### 1.1 Buat Database
```sql
CREATE DATABASE dialogika;
```

### 1.2 Konfigurasi Environment
Buat file `.env` di folder `lms` dengan konten berikut:

```env
# Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/dialogika"

# JWT Secret (for authentication)
JWT_SECRET="your-super-secret-jwt-key-here"

# App Configuration
NODE_ENV="development"
```

**Catatan:** Ganti `root:password` dengan kredensial MySQL Anda.

## Step 2: Install Dependencies

```bash
cd lms
npm install
```

## Step 3: Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

## Step 4: Run Seeder

```bash
# Jalankan seeder
npm run db:seed
```

## Step 5: Verify Setup

```bash
# Buka Prisma Studio untuk melihat data
npx prisma studio
```

## Data yang Akan Dibuat

### 👥 Users
- **Admin:** admin@dialogika.com / admin123
- **Student 1:** student1@example.com / student123
- **Student 2:** student2@example.com / student123

### 📚 Courses (6 courses)
- Mastering Public Speaking
- Effective Communication Skills
- Overcoming Stage Fright
- Persuasive Presentation Techniques
- Storytelling for Impact
- Body Language for Speakers

### 📖 Course Structures (18 structures)
Setiap course memiliki 2-4 sections dengan video dan PDF materials.

## Troubleshooting

### Error: "Cannot connect to database"
1. Pastikan MySQL server berjalan
2. Periksa kredensial di DATABASE_URL
3. Pastikan database `dialogika` sudah dibuat

### Error: "Module not found"
```bash
npm install
npx prisma generate
```

### Error: "Table doesn't exist"
```bash
npx prisma migrate dev --name init
```

## Next Steps

Setelah seeder berhasil dijalankan:

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Login sebagai Admin:**
   - Email: admin@dialogika.com
   - Password: admin123

3. **Login sebagai Student:**
   - Email: student1@example.com
   - Password: student123

## Production Notes

Untuk production environment:

1. **Gunakan password yang kuat**
2. **Ganti JWT_SECRET dengan nilai yang unik**
3. **Ganti video URLs dengan konten yang sesuai**
4. **Ganti PDF URLs dengan file yang sesuai**
5. **Setup proper database backup**

## File Structure

```
lms/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js           # Database seeder
├── .env                  # Environment variables
├── package.json          # Dependencies & scripts
└── SEEDER_DOCUMENTATION.md  # Detailed seeder docs
``` 