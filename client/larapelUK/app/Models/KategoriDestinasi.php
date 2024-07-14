<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriDestinasi extends Model
{
    protected $table = 'kategori_destinasi';
    protected $fillable = [
        'nama_kategori', 'deskripsi', 'image'
    ];

    // Definisi hubungan
    public function subkategoris()
    {
        return $this->hasMany(SubkategoriDestinasi::class, 'id_kategori');
    }
}
