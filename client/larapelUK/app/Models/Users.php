<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'username', 'password', 'role', 'nama_pelanggan', 'alamat', 'no_telp'
    ];
}
