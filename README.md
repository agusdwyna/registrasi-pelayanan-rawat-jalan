# Sistem Registrasi Pelayanan Rawat Jalan

Aplikasi ini adalah sistem manajemen data **pasien, dokter, layanan, asuransi, dan perusahaan** untuk kebutuhan registrasi rawat jalan berbasis web.

---

## Tech Stack

- React JS (Frontend)
- Node.js (Backend)
- Express.js
- MySQL / MariaDB

---

## Struktur Project

```txt
registrasi-pelayanan-rawat-jalan/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── seed/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   └── components/
│   └── App.jsx
```

---

## 🔌 API Endpoint

### Master Data

- `/pasien`
- `/dokter`
- `/layanan`
- `/master-asuransi`
- `/master-perusahaan`

### Method

- GET → Ambil data
- POST → Tambah data
- PUT → Update data
- DELETE → Hapus data

---

## ⚙️ Setup Backend

```bash
cd backend
npm install
```

### Konfigurasi Database

Edit file:

```
backend/config/Database.js
```

### Jalankan Server

```bash
node index.js
```

Server berjalan di:

```
http://localhost:5004
```

---

## Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di:

```
http://localhost:5173
```

---
