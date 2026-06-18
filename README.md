Tentu, Mas Zaenal! Mari kita buat **README.md** yang sangat profesional, rinci, dan terstruktur agar dosen kamu bisa langsung memahami alur proyek **JEBOOK** tanpa banyak bertanya.

Silakan salin teks di bawah ini ke dalam file `README.md` di repositori GitHub kamu.

---

# 📚 JEBOOK - E-Library & Digital Book Rental System

**Proyek Akhir UAS Pemrograman Web 2**

## 👤 Identitas Mahasiswa

* **Nama:** Zaenal Maulana Rizki
* **NIM:** 312410332
* **Kelas:** I241D
* **Jurusan:** Teknik Informatika
* **Mata Kuliah:** Pemrograman Web 2

---

## 📝 Deskripsi Proyek

**JEBOOK** adalah platform perpustakaan digital modern berbasis web yang dikembangkan untuk mempermudah manajemen koleksi buku dan proses peminjaman secara digital. Proyek ini diimplementasikan menggunakan arsitektur **RESTful API** yang memisahkan antara sistem *backend* dan *frontend*, sehingga menciptakan pengalaman pengguna yang cepat dan responsif (*Single Page Application*).

**Fitur Utama:**

* **Manajemen Buku:** Admin dapat menambah, mengubah, dan menghapus koleksi buku.
* **Sistem Peminjaman:** Pengguna dapat melihat status ketersediaan buku dan melakukan pengajuan sewa.
* **Autentikasi Aman:** Sistem login admin berbasis **JWT (JSON Web Token)** yang diproteksi untuk menjaga integritas data.
* **Responsive UI:** Antarmuka modern dengan **TailwindCSS** yang optimal dibuka di perangkat mobile maupun desktop.

---

## 🛠️ Arsitektur Teknologi

Proyek ini dibangun menggunakan teknologi terkini sebagai berikut:

* **Backend:** CodeIgniter 4 (RESTful API, Filter, MySQL Database).
* **Frontend:** Vue.js 3 (CDN Version, Single Page Application), Axios (HTTP Client), TailwindCSS (Styling).
* **Database:** MySQL (Relational Database Management System).

---

## 📸 Dokumentasi Aplikasi

### 1. Skema Relasi Database

[Lampirkan screenshot dari menu 'Designer' di phpMyAdmin]
*Penjelasan: Database menggunakan relasi antar tabel `books`, `rentals`, dan `users` untuk memastikan integritas data transaksi peminjaman.*

### 2. Uji Coba API (Postman - Error 401 Unauthorized)

[Lampirkan screenshot Postman yang menampilkan status 401 Unauthorized]
*Penjelasan: Pengujian API menunjukkan bahwa sistem proteksi (AuthFilter) berhasil menolak akses ke endpoint admin ketika request tidak menyertakan Bearer Token yang valid.*

### 3. Tampilan Antarmuka

* **Halaman Login:** [Lampirkan screenshot halaman login]
* **Dashboard Admin:** [Lampirkan screenshot halaman dashboard]
* **Modal Form (Tambah/Edit):** [Lampirkan screenshot modal popup]

---

## ⚙️ Petunjuk Instalasi (Local Development)

### 1. Menyiapkan Backend (CodeIgniter 4)

1. **Clone Repositori:** `git clone [link-repo-anda]`
2. **Database:** Buat database baru di phpMyAdmin dengan nama `jeebook`.
3. **Import SQL:** Import file database `.sql` yang ada di folder proyek ke database tersebut.
4. **Konfigurasi:** Masuk ke folder `backend-api`, ubah file `.env` dan sesuaikan koneksi database (`hostname`, `username`, `password`, `database`).
5. **Jalankan Server:** Buka terminal di folder `backend-api`, jalankan perintah:
```bash
php spark serve

```


*Backend akan berjalan di `http://localhost:8080`.*

### 2. Menyiapkan Frontend (Vue.js SPA)

1. Buka folder `frontend-spa`.
2. Buka file `index.html` dan pastikan variabel `API_URL` sudah sesuai dengan alamat lokal backend Anda:
```javascript
const API_URL = "/backend-api/public/api"; // Atau arahkan ke http://localhost:8080/api

```


3. Buka file `index.html` menggunakan *Live Server* atau langsung di browser Anda.

---

## 🌐 Tautan Proyek

* **Link Demo (Live Hosting):** [http://jeebok.site.je](http://jeebok.site.je)
* **Link Video Presentasi:** [Masukkan link video YouTube/Drive kamu di sini]

---

### 📝 Catatan Penting

Aplikasi ini sudah dioptimasi menggunakan metode **Relative Path** agar dapat berjalan dengan baik di lingkungan hosting InfinityFree tanpa kendala *Cross-Origin Resource Sharing (CORS)* maupun masalah protokol *Mixed Content* pada perangkat mobile.

---

### Tips untuk Mas Zaenal:

1. **Gambar Screenshot:** Pastikan file gambar screenshot kamu disimpan di folder `screenshots/` di dalam repo, agar link gambar di atas bisa terbaca dengan benar (contoh: `![Halaman Login](screenshots/login.png)`).
2. **Video Presentasi:** Jangan lupa sertakan link video agar dosen bisa melihat demonstrasi aplikasi kamu secara langsung.
3. **Nama Folder:** Pastikan nama foldernya di GitHub **tepat** sama dengan yang diminta (yaitu `backend-api` dan `frontend-spa`).

Apakah ada bagian dari README ini yang ingin kamu tambahkan atau ubah, Mas?
