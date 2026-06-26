# 📚 JEBOOK - E-Library & Digital Book Rental System
> **Laporan Akhir Lengkap & Dokumentasi Sistem - Ujian Akhir Semester (UAS) Pemrograman Web 2**

---

## 👤 Identitas Mahasiswa
* **Nama Lengkap:** Zaenal Maulana Rizki
* **NIM:** 312410332
* **Kelas:** I241D
* **Jurusan:** Teknik Informatika
* **Mata Kuliah:** Pemrograman Web 2

---

## 📝 Deskripsi Proyek & Tema Studi Kasus
**JEBOOK** adalah platform perpustakaan digital modern (*E-Library*) berbasis web yang dirancang khusus untuk mengotomatisasi sirkulasi manajemen koleksi buku serta mempermudah proses peminjaman buku digital secara mandiri.

Tema studi kasus yang dipilih adalah **Sistem Informasi Peminjaman Buku Digital Berbasis Single Page Application (SPA)**. Aplikasi ini mengusung arsitektur modern *Decoupled Architecture*, di mana sistem dipisahkan penuh menjadi dua bagian utama:
1. **Backend RESTful API (CodeIgniter 4):** Berperan sebagai motor penggerak data yang menyediakan endpoint mentah berformat JSON, memproses logika bisnis, mengelola transaksi database, serta memproteksi rute CRUD admin menggunakan komponen filter token kustom (`AuthFilter`).
2. **Frontend SPA (Vue.js 3 & TailwindCSS):** Berperan sebagai penyaji antarmuka interaktif yang mengonsumsi data dari API. Memanfaatkan reaktivitas Vue, seluruh transisi data dan perpindahan halaman terjadi secara *real-time* tanpa perlu memuat ulang browser (*no-reload page*).

---

## ⚙️ Petunjuk Instalasi Lingkungan Lokal (Localhost Development)

Proyek dikonfigurasikan di bawah lingkungan web server Apache lokal dengan struktur penempatan direktori folder di:
`C:/xampp/htdocs/UAS_Web2_312410332_Zaenal Maulana Rizki/`

### 1. Mengaktifkan Layanan Web Server Lokal via XAMPP
1. Buka aplikasi **XAMPP Control Panel** di komputer Anda.
2. Klik tombol **Start** pada modul **Apache** untuk mengaktifkan web server.
3. Klik tombol **Start** pada modul **MySQL** untuk mengaktifkan server basis data database.
4. Pastikan status kedua modul tersebut sudah berwarna hijau menandakan port `80`, `443`, dan `3306` telah aktif.

<img width="726" height="556" alt="Status XAMPP Aktif" src="https://github.com/user-attachments/assets/7fc487dc-eb83-4a9a-a677-6839e8b3c526" />

### 2. Melakukan Import Database MySQL
1. Buka browser Anda, akses alamat: `http://localhost/phpmyadmin/`
2. Buat sebuah database baru dengan nama **`db_jebook`**.
3. Pilih database `db_jebook` tersebut, klik tab **Import**, lalu pilih file SQL proyek yang tersedia di dalam folder root. Klik **Go/Import** sampai seluruh struktur tabel berhasil di-generate.

### 3. Menjalankan Server Backend CodeIgniter 4
1. Buka File Explorer, masuk ke folder tujuan:
   `C:/xampp/htdocs/UAS_Web2_312410332_Zaenal Maulana Rizki/backend-api/`
2. Pastikan file `.env` lokal Anda telah dikonfigurasi secara tepat:
   ```ini
   CI_ENVIRONMENT = development
   app.baseURL = 'http://localhost/UAS_Web2_312410332_Zaenal%20Maulana%20Rizki/backend-api/public/'

   database.default.hostname = localhost
   database.default.database = db_jebook
   database.default.username = root
   database.default.password = 
   database.default.DBDriver = MySQLi


3. Lakukan klik kanan di area kosong di dalam folder `backend-api` tersebut, lalu pilih opsi **Open in Terminal** (Buka di Terminal / Git Bash / Command Prompt).
4. Di dalam terminal yang terbuka, ketikkan perintah berikut untuk menyalakan mesin CodeIgniter:
```bash
php spark serve

```

5. Terminal akan menampilkan status aktif bahwa server lokal berhasil berjalan di `http://localhost:8080`.

### 4. Menjalankan Aplikasi Frontend (VueJS SPA)

1. Buka direktori folder frontend Anda di:
`C:/xampp/htdocs/UAS_Web2_312410332_Zaenal Maulana Rizki/frontend-spa/`
2. Buka berkas file `index.html` menggunakan editor VS Code, pastikan baris `API_URL` mengarah ke target internal lokal:
```javascript
const API_URL = "http://localhost/UAS_Web2_312410332_Zaenal%20Maulana%20Rizki/backend-api/public/api";

```


3. Jalankan file `index.html` tersebut dengan mengklik kanan lalu pilih **Open with Live Server** di VS Code.
4. Aplikasi frontend Anda siap diuji pada browser laptop Anda melalui alamat URL:
`http://localhost/UAS_Web2_312410332_Zaenal%20Maulana%20Rizki/frontend-spa/index.html#/`

---

## 💻 Struktur Kode Program (VS Code Visuals)

### 1. File Utama `index.html` Frontend (Integrasi Vue & Tailwind)

*Tempat Screenshot potongan kode inisialisasi aplikasi Vue 3, Vue Router, Axios Interceptors, dan penetapan variabel target `API_URL`.*
`![Kodingan Frontend index.html](screenshots/vsc_frontend.png)`

### 2. File Konfigurasi `.env` & `Filters.php` Backend (CodeIgniter 4)

*Tempat Screenshot berkas `.env` untuk manajemen sistem database lokal serta deklarasi filter CORS global pada berkas `Filters.php`.*
`![Kodingan Backend Filters](screenshots/vsc_backend.png)`

---

## 🚀 Fitur-Fitur Detail & Antarmuka Aplikasi

### 🌐 A. Sisi Pengguna Publik (Public Client Interface)

#### 1. Beranda & Katalog Koleksi Buku Terbaru

Menyajikan visualisasi grid kartu (*cards*) koleksi buku terbaru yang dinamis menggunakan grid bertenaga TailwindCSS. Terdapat fitur pencarian reaktif instan berdasarkan judul atau nama penulis secara instan tanpa memicu reload.

<img width="1917" height="986" alt="image" src="https://github.com/user-attachments/assets/7d9806d6-b73c-4671-8c87-edc419565b33" />

#### 2. Formulir Sewa Buku Digital (Form Modal Input Identitas)

Ketika tombol "Sewa Buku" diklik, sistem memicu komponen *pop-up modal*. Di sini pengguna wajib mengisikan identitas lengkap meliputi Nama Lengkap, Email Aktif, dan Tanggal batas akhir Pengembalian.

<img width="1276" height="841" alt="image" src="https://github.com/user-attachments/assets/07be3c5a-0562-4891-8184-fa37f3ad83a2" />

#### 3. Halaman Daftar Pinjaman Publik

Menyajikan visualisasi data berbentuk tabel transparan yang memuat rekam jejak status buku-buku yang sedang disewa secara global beserta info pengembalian, guna menghindari bentrok durasi sewa antar pembaca.

<img width="1917" height="792" alt="image" src="https://github.com/user-attachments/assets/ec8afab0-b481-4a3a-a426-7267e42baed9" />

---

### 🔐 B. Sisi Panel Admin (Protected Dashboard Interface)

#### 1. Halaman Login Admin Perpustakaan

Gerbang pintu otentikasi admin panel yang terproteksi aman. Hak akses dashboard menggunakan akun kredensial username `admin` dan password `admin123` dengan penanganan stateful Bearer Token.

<img width="1916" height="694" alt="image" src="https://github.com/user-attachments/assets/7fecdbeb-6734-4726-95c9-8f1c77f8a985" />

#### 2. Dashboard Utama Admin & Visualisasi Tabel Data CRUD

Ruang kendali internal admin untuk manajemen kontrol penuh siklus data master buku, mencakup penambahan tajuk buku baru, pembaharuan komponen info buku, serta penghapusan buku dari database.

<img width="1919" height="986" alt="image" src="https://github.com/user-attachments/assets/9bfb83fe-eb60-44f8-b515-f6c0148eaae9" />

#### 3. Tampilan Form Modal Tambah / Edit Koleksi Buku

Komponen pop-up isian dinamis bagi admin untuk menyuntikkan data spesifikasi buku (judul, penulis, penerbit, sinopsis, genre, link cover URL) secara langsung menuju database server.

<img width="632" height="571" alt="image" src="https://github.com/user-attachments/assets/69852e7a-ec10-4a13-818f-68ab163b8576" />

---
<img width="765" height="652" alt="image" src="https://github.com/user-attachments/assets/15a28d3e-ea49-4710-b89f-0ef1af24f797" />

#### 4. Monitoring Daftar Anggota & Status Sirkulasi Buku

Struktur tabel pemantauan data identitas para peminjam aktif. Sistem reaktivitas Vue otomatis merubah label ketersediaan dari warna hijau **"Tersedia"** menjadi jingga **"Sedang Dipinjam"** sesaat setelah sewa divalidasi.

<img width="1919" height="697" alt="image" src="https://github.com/user-attachments/assets/db5db6b6-5480-4e13-99da-4be3b2c9615c" />

---
<img width="1919" height="709" alt="image" src="https://github.com/user-attachments/assets/3c479445-147a-4725-bc2c-c0daf4b74688" />

---

## 📸 Dokumentasi Pengujian API & Database

### 1. Skema Relasi Tabel Database (phpMyAdmin Designer)

Desain visual relasi basis data entitas JEBOOK yang menampung ikatan constraint foreign key antara tabel data induk buku (`books`) dan log histori peminjaman (`rentals`).

<img width="573" height="425" alt="image" src="https://github.com/user-attachments/assets/6caa8d78-2648-42ce-be85-66b3b2f79c72" />

### 2. Uji Coba API Gagal (Error 401 Unauthorized via Postman)

Bukti empiris pengujian keandalan sistem proteksi filter keamanan `AuthFilter` backend. Route admin otomatis memblokir request dan melempar kode respon merah `401 Unauthorized` jika token Authorization Bearer kosong.

<img width="1437" height="691" alt="image" src="https://github.com/user-attachments/assets/6ac95321-90a5-4851-9f72-49a6febdbe91" />

---

## 🌐 Tautan Akses Proyek

* **Link Live Demo Aplikasi (Hosting Online):** [http://jeebok.site.je/frontend-spa/index.html#/](http://jeebok.site.je/frontend-spa/index.html#/)
* **Link Video Presentasi Dokumentasi Proyek:** https://youtu.be/BEvuo2T_99M?si=0vu3R-xKvHpgYFzY

---

### 📝 Catatan Penting Mengenai Jalur Relatif (Relative Path)

Proyek ini diimplementasikan menggunakan pemanggilan **Relative Path** (`/backend-api/public/api`) pada bagian frontend production. Hal ini merupakan teknik optimasi mutakhir agar frontend dan backend dapat saling bertukar data di server hosting InfinityFree secara langsung tanpa terhambat oleh kebijakan sistem keamanan *Cross-Origin Resource Sharing (CORS)* maupun kendala pemblokiran *Mixed Content* (HTTP vs HTTPS) pada sistem operasi perangkat mobile (HP).

---
