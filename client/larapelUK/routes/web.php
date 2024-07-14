<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategoriDestinasiController;
use App\Http\Controllers\SubkategoriDestinasiController;
use App\Http\Controllers\PaketController;
use App\Http\Controllers\TransaksiController;

use App\Http\Controllers\ProfileController;

// Rute untuk login dan logout
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/', function () {
    return view('home');
})->name('home');

// Rute yang hanya bisa diakses oleh pengguna yang telah login
Route::middleware('auth.check')->group(function () {

    Route::get('/kategori-destinasi', [KategoriDestinasiController::class, 'index'])->name('kategori-destinasi.index');
    Route::get('/subkategori/{id_kategori}', [SubkategoriDestinasiController::class, 'index'])->name('subkategori.index');
    Route::get('/subkategori/{subkategori_id}/paket', [PaketController::class, 'index'])->name('paket.index');
    
    Route::get('/transaksi/create/{id}', [TransaksiController::class, 'create'])->name('transaksi.create');
    Route::post('/transaksi/store', [TransaksiController::class, 'store'])->name('transaksi.store');

    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');

});
?>
