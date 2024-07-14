<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        $userId = session('user_id');
        $userName = session('username');
        $userPelanggan = session('user_name');
        $userAddress = session('user_address');
        $userPhone = session('user_phone');

        return view('profile', compact('userId', 'userName', 'userPelanggan', 'userAddress', 'userPhone'));
    }
}

