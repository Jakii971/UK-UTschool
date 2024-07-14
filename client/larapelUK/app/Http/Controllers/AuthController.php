<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $headerData = $this->showHeader();

        $request->validate([
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        $user = Users::where('username', $request->username)->first();
        if (!$user || $request->password !== $user->password ) {
            return redirect('/login')->with('fail', 'Username atau Password salah');
        }
        $request->session()->put('user_id', $user->id);
        $request->session()->put('username', $user->username);
        $request->session()->put('user_name', $user->nama_pelanggan);
        $request->session()->put('user_address', $user->alamat);
        $request->session()->put('user_phone', $user->no_telp);
        
        return redirect()->route('kategori-destinasi.index', compact('headerData'));
    }

    public function logout(Request $request)
    {
        $request->session()->forget('user_id');
        return redirect('/login');
    }

    public function showHeader()
    {
        $userPelanggan = session('user_name');

        //return compact('userPelanggan');
        return view('shared.header', compact('userPelanggan'));
    }
}
