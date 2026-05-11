## Sistem Registrasi Pelayanan Rawat Jalan

Aplikasi ini adalah sistem manajemen data pasien, dokter, layanan, asuransi, dan perusahaan untuk kebutuhan registrasi rawat jalan berbasis web.

## Tech Stack

- React JS (Frontend)
- Node.js (Backend)
- Express.js
- MySQL / MariaDB

---

## Struktur Project

registrasi-pelayanan-rawat-jalan/
│
├── backend/
│ ├── models/
│ ├── controllers/
│ ├── routes/
│ ├── config/
│ └── seed/
| └── index.js
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── api/
│ │ └── components/
│ └── App.jsx

## API Endpoint

- /pasien
- /dokter
- /layanan
- /master-asuransi
- /master-perusahaan

GET, POST, PUT, DELETE

## Setup Backend

- cd backend
- npm install
- setup database di config/Database.js
- node index

## Setup Frontend

- cd frontend
- npm install
- npm run dev
