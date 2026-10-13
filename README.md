# Soal Tes Internship Fumindo - Asset Management

Proyek CRUD Asset Management sederhana, to the point, dan mudah dipahami, sesuai pengerjaan manual 1 jam:
1. **Database PostgreSQL**: Database `asset_fumindo` dengan tabel `asset` (`asset_id`, `asset_name`, `stock_quantity`, `category`).
2. **API NestJS**: RESTful API CRUD dengan TypeORM & Class Validator di port `3000`.
3. **Frontend Vue.js**: Single Page Application (SPA) sederhana menggunakan Vue 3 di port `5173`.

---

## 📁 Struktur Proyek

```text
test-fumindo-new/
├── init.sql              # Script SQL database, tabel, & data dummy
├── docker-compose.yml    # (Opsional) Docker compose untuk PostgreSQL
├── backend/              # NestJS RESTful API
│   ├── src/
│   │   ├── asset/
│   │   │   ├── dto/
│   │   │   │   ├── create-asset.dto.ts
│   │   │   │   └── update-asset.dto.ts
│   │   │   ├── asset.controller.ts
│   │   │   ├── asset.entity.ts
│   │   │   ├── asset.module.ts
│   │   │   └── asset.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── .env
│   └── package.json
├── frontend/             # Vue 3 Single Page Application (Super Simple)
│   ├── src/
│   │   ├── App.vue       # Form tambah/edit + Tabel CRUD sederhana
│   │   ├── main.js
│   │   └── style.css     # Styling CSS ringkas (~100 baris)
│   └── package.json
└── README.md
```

---

## 🚀 Panduan Menjalankan

### 1. Inisialisasi Database (PostgreSQL)

Jika menggunakan Docker:
```bash
docker compose up -d
```
Atau jika menggunakan PostgreSQL lokal:
```bash
# Buat database (jika belum ada)
createdb -U postgres asset_fumindo

# Jalankan script init.sql
psql -U postgres -d asset_fumindo -f init.sql
```

---

### 2. Menjalankan Backend (NestJS)

Masuk ke direktori `backend`:
```bash
cd backend
npm install
npm run start:dev
```
Backend berjalan di: `http://localhost:3000`

---

### 3. Menjalankan Frontend (Vue.js)

Buka terminal baru, masuk ke direktori `frontend`:
```bash
cd frontend
npm install
npm run dev
```
Buka browser pada: `http://localhost:5173`

---

## 📡 Dokumentasi Endpoint API

Base URL: `http://localhost:3000/assets`

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/assets` | Mengambil seluruh data asset | `200 OK` |
| **GET** | `/assets/:id` | Mengambil 1 data asset berdasarkan ID | `200 OK` / `404 Not Found` |
| **POST** | `/assets` | Menambahkan asset baru | `201 Created` / `400 Bad Request` |
| **PUT** | `/assets/:id` | Mengupdate data asset | `200 OK` / `404 Not Found` |
| **DELETE** | `/assets/:id` | Menghapus data asset | `200 OK` / `404 Not Found` |

### Contoh Request Body (POST / PUT)
```json
{
  "asset_name": "Kursi Kantor",
  "stock_quantity": 10,
  "category": "Non-Consumable"
}
```
*Nilai valid untuk `category`: `"Consumable"` atau `"Non-Consumable"`.*

---

## 💻 Alur Kerja Frontend (Vue.js)
- **Form Input (Atas)**: Form input simpel berisi Nama Asset, Jumlah Stok, dan Kategori. Jika tombol **Edit** pada salah satu baris diklik, form otomatis berubah ke mode update (lengkap dengan tombol Batal).
- **Tabel Asset (Bawah)**: Menampilkan seluruh data asset dengan kolom ID, Nama Asset, Stok, Kategori, serta tombol aksi **Edit** dan **Hapus**.
- **Hapus Data**: Menggunakan dialog konfirmasi bawaan browser sebelum request delete dikirim.
