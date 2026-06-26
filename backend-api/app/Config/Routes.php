<?php

use CodeIgniter\Router\RouteCollection;

/** * @var RouteCollection $routes 
 */

// Rute Default / Landing Page API
$routes->get('/', 'Home::index');

// Endpoint Otentikasi & Data Master Publik (Membawa Namespace Lengkap)
$routes->post('api/login', '\App\Controllers\AuthController::login');
$routes->get('api/books', '\App\Controllers\BookController::index');
$routes->get('api/books/(:num)', '\App\Controllers\BookController::show/$1');

// Endpoint Publik untuk Transaksi User Peminjam (Sewa & Kembalikan)
$routes->post('api/rentals', '\App\Controllers\RentalController::rentBook');
$routes->get('api/rentals', '\App\Controllers\RentalController::getRentals');
$routes->post('api/rentals/return/(:num)', '\App\Controllers\RentalController::returnBook/$1');

// --- GROUP ROUTE DENGAN PROTEKSI FILTER TOKEN ---
$routes->group('api', ['filter' => 'authFilter'], function (&$routes) {
    $routes->post('books', '\App\Controllers\BookController::create');
    $routes->put('books/(:num)', '\App\Controllers\BookController::update/$1');
    $routes->delete('books/(:num)', '\App\Controllers\BookController::delete/$1');
});