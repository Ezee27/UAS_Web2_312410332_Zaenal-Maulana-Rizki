<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\API\ResponseTrait;

class AuthFilter implements FilterInterface
{
    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        
        // Jika header Authorization kosong / tidak menyertakan token
        if (!$authHeader) {
            $response = service('response');
            $response->setStatusCode(401); // Sesuai instruksi soal wajib status 401
            $response->setJSON(['message' => 'Akses Ditolak. Token Tidak Ditemukan.']);
            return $response;
        }

        // Pecah teks string "Bearer amVib..." menjadi token murni
        $token = str_replace('Bearer ', '', $authHeader);

        // Validasi token statis token_jebook_admin_2026
        if ($token !== 'amVib29rX3Rva2VuXzIwMjY=') { 
            $response = service('response');
            $response->setStatusCode(401); // Sesuai instruksi soal wajib status 401
            $response->setJSON(['message' => 'Sesi Anda Habis / Token Tidak Valid.']);
            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do nothing
    }
}