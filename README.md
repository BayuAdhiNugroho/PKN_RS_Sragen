# Sistem Informasi RSU PKU Muhammadiyah Sragen

Proyek ini adalah sistem informasi untuk RSU PKU Sragen berbasis **Full-stack (MERN/PERN Stack)** dengan menggunakan arsitektur *Monorepo*.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router Dom
- **Backend**: Node.js, Express.js, Prisma ORM, JWT Authentication, Multer (File Upload)
- **Database**: MySQL (Hosted on Railway)

## 📂 Struktur Proyek
- `/frontend` — Berisi kode sumber antarmuka pengguna (Public Pages & Admin Dashboard).
- `/backend` — Berisi kode sumber API (REST API), logika otentikasi, schema database Prisma, dan pengelola file gambar.

## 🚀 Instalasi & Menjalankan Lokal

### 1. Kloning Repositori
```bash
git clone https://github.com/BayuAdhiNugroho/PKN_RS_Sragen.git
cd PKN_RS_Sragen
```

### 2. Setup Backend
```bash
cd backend
npm install
```
Buat file `.env` di dalam folder `/backend` dengan isi:
```env
DATABASE_URL="mysql://root:<password>@<host>:<port>/railway"
JWT_SECRET="rahasia_anda_disini"
PORT=5000
```
Lalu jalankan server backend:
```bash
npm run dev
```

### 3. Setup Frontend
Buka terminal baru:
```bash
cd frontend
npm install
```
Buat file `.env` di dalam folder `/frontend` dengan isi:
```env
VITE_API_URL=http://localhost:5000/api
```
Lalu jalankan server frontend:
```bash
npm run dev
```

Aplikasi bisa diakses di `http://localhost:5173`.
*Catatan: Anda bisa login ke panel admin di `/login` dengan akun default `admin` / `admin123` jika seed database telah dijalankan.*

## 🌍 Deployment
- **Backend**: Direkomendasikan deploy melalui [Railway.app](https://railway.app) (Setting Root Directory ke `/backend`).
- **Frontend**: Direkomendasikan deploy melalui [Vercel](https://vercel.com) (Setting Root Directory ke `/frontend`).

---
*Dibuat untuk Praktik Kerja Nyata (PKN) — Bayu Adhi Nugroho*