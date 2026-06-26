<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class RentalController extends ResourceController
{
    protected $format = 'json';

    public function rentBook()
    {
        $db = \Config\Database::connect();
        
        // 1. Ambil input JSON dari Axios atau fallback ke getVar
        $json = $this->request->getJSON(true);
        $name        = $json['name'] ?? $this->request->getVar('name');
        $email       = $json['email'] ?? $this->request->getVar('email');
        $book_id     = $json['book_id'] ?? $this->request->getVar('book_id');
        $return_date = $json['return_date'] ?? $this->request->getVar('return_date');

        if (!$name || !$email || !$book_id || !$return_date) {
            return $this->respond(['message' => 'Data tidak lengkap, harap isi semua field!'], 400);
        }

        // 2. Masukkan data ke tabel members
        $db->table('members')->insert([
            'name'  => $name,
            'email' => $email
        ]);
        $member_id = $db->insertID();

        // 3. Masukkan data ke tabel rentals
        $db->table('rentals')->insert([
            'book_id'     => $book_id,
            'member_id'   => $member_id,
            'return_date' => $return_date,
            'status'      => 'Aktif'
        ]);

        // 4. Update status buku menjadi 'Dipinjam'
        $db->table('books')->where('id', $book_id)->update(['status' => 'Dipinjam']);

        return $this->respond(['message' => 'Buku berhasil disewa!'], 200);
    }

    public function getRentals()
    {
        $db = \Config\Database::connect();
        
        // SINKRONISASI: Menambahkan 'books.image_url as image_url' agar dilempar ke frontend
        $query = $db->table('rentals')
            ->select('rentals.id as rental_id, rentals.return_date, rentals.status as rental_status, 
                      books.title as title, books.genre, books.image_url as image_url,
                      members.name as member_name, members.email as member_email')
            ->join('books', 'books.id = rentals.book_id', 'left')
            ->join('members', 'members.id = rentals.member_id', 'left')
            ->get()
            ->getResultArray();

        return $this->respond($query, 200);
    }

    public function returnBook($id = null)
    {
        $db = \Config\Database::connect();
        
        $rental = $db->table('rentals')->where('id', $id)->get()->getRowArray();
        
        if ($rental) {
            // Update status rental
            $db->table('rentals')->where('id', $id)->update(['status' => 'Kembali']);
            // Kembalikan status buku menjadi Tersedia
            $db->table('books')->where('id', $rental['book_id'])->update(['status' => 'Tersedia']);
            
            return $this->respond(['message' => 'Buku sukses dikembalikan!'], 200);
        }
        
        return $this->respond(['message' => 'Data tidak ditemukan!'], 404);
    }
}