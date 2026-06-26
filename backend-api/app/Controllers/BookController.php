<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class BookController extends ResourceController
{
    protected $modelName = 'App\Models\BookModel'; 
    protected $format    = 'json';

    public function index()
    {
        $db = \Config\Database::connect();
        $books = $db->table('books')->orderBy('id', 'DESC')->get()->getResultArray();
        return $this->respond($books, 200);
    }

    public function create()
    {
        $db = \Config\Database::connect();
        
        // Ambil data JSON dari Axios atau fallback ke getVar
        $json = $this->request->getJSON(true);
        
        $data = [
            'title'     => $json['title'] ?? $this->request->getVar('title'),
            'genre'     => $json['genre'] ?? $this->request->getVar('genre'),
            'publisher' => $json['publisher'] ?? $this->request->getVar('publisher'),
            'author'    => $json['author'] ?? $this->request->getVar('author'),
            'synopsis'  => $json['synopsis'] ?? $this->request->getVar('synopsis'),
            'image_url' => $json['image_url'] ?? $this->request->getVar('image_url'),
            'status'    => 'Tersedia'
        ];
        
        $db->table('books')->insert($data);
        return $this->respond(['message' => 'Buku berhasil ditambahkan!'], 201);
    }

    public function update($id = null)
    {
        $db = \Config\Database::connect();
        
        // 1. Ambil payload data JSON dari Axios
        $data = $this->request->getJSON(true);
        
        // 2. Jika payload kosong (format x-www-form-urlencoded), ambil dari Raw Input
        if (empty($data)) {
            $data = $this->request->getRawInput();
        }

        // 3. KEAMANAN KRUSIAL: Hapus field 'id' dan 'created_at' agar tidak bentrok atau mengganggu Primary Key di database
        if (isset($data['id'])) {
            unset($data['id']);
        }
        if (isset($data['created_at'])) {
            unset($data['created_at']);
        }

        // 4. Eksekusi update data
        if (!empty($data)) {
            $db->table('books')->where('id', $id)->update($data);
            return $this->respond(['message' => 'Buku berhasil diperbarui!'], 200);
        }

        return $this->respond(['message' => 'Tidak ada data yang diperbarui.'], 400);
    }

    public function delete($id = null)
    {
        $db = \Config\Database::connect();
        $db->table('books')->where('id', $id)->delete();
        return $this->respond(['message' => 'Buku berhasil dihapus!'], 200);
    }
}