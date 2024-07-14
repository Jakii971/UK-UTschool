<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    protected $table = 'paket';
    protected $fillable = [
        'id_subkategori', 'nama_paket', 'durasi', 'harga'
    ];

    // Definisi hubungan
    public function subkategori()
    {
        return $this->belongsTo(SubkategoriDestinasi::class, 'id_subkategori');
    }
}
