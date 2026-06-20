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

<img width="726" height="556" alt="image" src="https://github.com/user-attachments/assets/7fc487dc-eb83-4a9a-a677-6839e8b3c526" />

### 2. Melakukan Import Database MySQL
1. Buka browser Anda, akses alamat: `http://localhost/phpmyadmin/`
2. Buat sebuah database baru dengan nama **`db_jebook`**.
3. Pilih database `db_jebook` tersebut, klik tab **Import**, lalu pilih file SQL proyek yang tersedia di dalam folder root. Klik **Go/Import** sampai seluruh struktur tabel berhasil di-generate.

### 3. Menjalankan Server Backend CodeIgniter 4
1. Buka File Explorer, masuk ke folder tujuan:
   `C:/xampp/htdocs/UAS_Web2_312410332_Zaenal Maulana Rizki/backend-api/`
2. Pastikan file `.env` lokal Anda telah dikonfigurasi secara tepat:
ini
   ```
   CI_ENVIRONMENT = development
   app.baseURL = 'http://localhost/UAS_Web2_312410332_Zaenal%20Maulana%20Rizki/backend-api/public/'

   database.default.hostname = localhost
   database.default.database = db_jebook
   database.default.username = root
   database.default.password = 
   database.default.DBDriver = MySQLi

<img width="698" height="654" alt="image" src="https://github.com/user-attachments/assets/55934307-392e-43ad-8ffb-5e23de74b47f" />


3. Lakukan klik kanan di area kosong di dalam folder `backend-api` tersebut, lalu pilih opsi **Open in Terminal** (Buka di Terminal / Git Bash / Command Prompt).
4. Di dalam terminal yang terbuka, ketikkan perintah berikut untuk menyalakan mesin CodeIgniter:
```bash
php spark serve

```

<img width="852" height="298" alt="image" src="https://github.com/user-attachments/assets/6411adea-1a38-4d63-8b37-443e6eb2cbb6" />


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

Screenshot potongan kode inisialisasi aplikasi Vue 3, Vue Router, Axios Interceptors, dan penetapan `API_URL`.


### 2. File Konfigurasi `.env` & `Filters.php` Backend (CodeIgniter 4)

Screenshot file `.env` untuk pengaturan database online/offline dan file `Filters.php` tempat didaftarkannya sistem pengaman CORS global.


---

## 🚀 Fitur-Fitur Detail & Antarmuka Aplikasi

### 🌐 A. Sisi Pengguna Publik (Public Client Interface)

#### 1. Beranda & Katalog Koleksi Buku Terbaru

Menyajikan visualisasi grid kartu (*cards*) koleksi buku terbaru yang dinamis menggunakan grid bertenaga TailwindCSS. Terdapat fitur pencarian reaktif instan berdasarkan judul atau nama penulis tanpa reload.


#### 2. Formulir Sewa Buku Digital (Form Modal Input Identitas)

Ketika tombol "Sewa Buku" diklik, sistem memicu *pop-up modal*. Di sini pengguna wajib mengisikan identitas lengkap meliputi Nama Lengkap, Email Aktif, dan Tanggal Pengembalian.


#### 3. Halaman Daftar Pinjaman Publik

Menyajikan tabel transparan yang berisi rekam jejak buku yang sedang disewa secara global, lengkap dengan informasi tanggal pengembalian dan nama peminjam agar tidak terjadi bentrok sewa.


---

### 🔐 B. Sisi Panel Admin (Protected Dashboard Interface)

#### 1. Halaman Login Admin Perpustakaan

Gerbang otentikasi aman khusus bagi pengelola perpustakaan menggunakan username `admin` dan password `admin123` bertenaga Stateful Bearer Token.


#### 2. Dashboard Utama Admin & Visualisasi Tabel Data CRUD

Ruang kerja admin untuk mengelola manajemen data master buku secara penuh (Tambah data buku baru, Edit detail informasi buku, dan Hapus buku dari sistem database).


#### 3. Tampilan Form Modal Tambah / Edit Koleksi Buku

Modal pop-up form penampung masukan data spesifikasi buku baru (judul, penulis, penerbit, sinopsis, genre, cover URL) ke dalam server database.


#### 4. Monitoring Daftar Anggota & Status Sirkulasi Buku

Tabel rekam data anggota pembaca serta pemantauan status sirkulasi buku terkini yang otomatis berubah dari label hijau **"Tersedia"** menjadi jingga **"Sedang Dipinjam"** ketika formulir sewa disubmit.


---

## 📸 Dokumentasi Pengujian API & Database

### 1. Skema Relasi Tabel Database (phpMyAdmin Designer)

Desain basis data relasional JEBOOK yang menampung relasi foreign key antara tabel buku (`books`) dan log peminjaman (`rentals`).


### 2. Uji Coba API Gagal (Error 401 Unauthorized via Postman)

Bukti pengujian keandalan komponen `AuthFilter` backend yang otomatis memblokir request jika token Authorization Bearer kosong atau tidak sah.


---

## 🌐 Tautan Akses Proyek

* **Link Live Demo Aplikasi (Hosting Online):** [http://jeebok.site.je/frontend-spa/index.html#/](http://jeebok.site.je/frontend-spa/index.html#/)
* **Link Video Presentasi Dokumentasi Proyek:** [Masukkan Link Tautan Video YouTube / Google Drive Anda Disini]

---

### 📝 Catatan Penting Mengenai Jalur Relatif (Relative Path)

Proyek ini diimplementasikan menggunakan pemanggilan **Relative Path** (`/backend-api/public/api`) pada bagian frontend production. Hal ini merupakan teknik optimasi mutakhir agar frontend dan backend dapat saling bertukar data di server hosting InfinityFree secara langsung tanpa terhambat oleh kebijakan sistem keamanan *Cross-Origin Resource Sharing (CORS)* maupun kendala pemblokiran *Mixed Content* (HTTP vs HTTPS) pada sistem operasi perangkat mobile (HP).

```

```
