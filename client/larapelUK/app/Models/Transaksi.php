<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    protected $table = 'transaksi';
    protected $fillable = [
        'user_id', 'paket_id', 'tanggal_transaksi', 'jumlah_harga'
    ];

    // Definisi hubungan
    public function user()
    {
        return $this->belongsTo(Users::class);
    }

    public function paket()
    {
        return $this->belongsTo(Paket::class);
    }
}
