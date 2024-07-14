<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paket;
use App\Models\Transaksi;
use Illuminate\Support\Facades\Auth;

class TransaksiController extends Controller
{
    public function index()
    {
        $transaksis = Transaksi::all();
        return response()->json(['data' => $transaksis]);
    }

    public function create($id)
    {
        $userId = session('user_id');
        $userName = session('username');
        $userPelanggan = session('user_name');
        $userAddress = session('user_address');
        $userPhone = session('user_phone');

        $paket = Paket::findOrFail($id);
        
        return view('transaksi.create', compact('userId', 'userName', 'userPelanggan','userAddress', 'userPhone','paket'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'paket_id' => 'required',
            'tanggal_transaksi' => 'required|date',
            'jumlah_harga' => 'required|numeric',
        ]);

        Transaksi::create([
            'user_id' => $request->user_id,
            'paket_id' => $request->paket_id,
            'tanggal_transaksi' => $request->tanggal_transaksi,
            'jumlah_harga' => $request->jumlah_harga,
        ]);

        return redirect()->route('kategori-destinasi.index')->with('success', 'Transaksi berhasil dibuat.');
    }
    
    /** 
    public function store(Request $request)
    {
        $transaksi = Transaksi::create($request->all());
        return response()->json(['data' => $transaksi], 201);
    }
    */

    public function show($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        return response()->json(['data' => $transaksi]);
    }

    public function update(Request $request, $id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->update($request->all());
        return response()->json(['data' => $transaksi]);
    }

    public function destroy($id)
    {
        $transaksi = Transaksi::findOrFail($id);
        $transaksi->delete();
        return response()->json(['message' => 'Transaksi deleted successfully']);
    }
}
