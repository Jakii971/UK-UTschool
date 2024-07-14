<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubkategoriDestinasi extends Model
{
    protected $table = 'subkategori_destinasi';
    protected $fillable = [
        'id_kategori', 'nama_subkategori', 'deskripsi', 'image'
    ];

    // Definisi hubungan
    public function kategori()
    {
        return $this->belongsTo(KategoriDestinasi::class, 'id_kategori');
    }

    public function pakets()
    {
        return $this->hasMany(Paket::class, 'id_subkategori');
    }
}
