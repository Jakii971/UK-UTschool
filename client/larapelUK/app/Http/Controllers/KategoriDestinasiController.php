<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KategoriDestinasi;
use Illuminate\Support\Facades\Storage;

class KategoriDestinasiController extends Controller
{
    public function index()
    {
        $kategoris  = KategoriDestinasi::all();
        $userPelanggan = session('user_name');
        return view('kategori.index', compact('kategoris', 'userPelanggan'));
        //return view('kategori_destinasi', ['kategoris ' => $kategoris ]);
    }

    public function store(Request $request)
    {
        $kategoriDestinasi = KategoriDestinasi::create($request->all());
        return response()->json(['data' => $kategoriDestinasi], 201);
    }

    public function show($id)
    {
        $kategoriDestinasi = KategoriDestinasi::findOrFail($id);
        return response()->json(['data' => $kategoriDestinasi]);
    }

    public function update(Request $request, $id)
    {
        $kategoriDestinasi = KategoriDestinasi::findOrFail($id);
        $kategoriDestinasi->update($request->all());
        return response()->json(['data' => $kategoriDestinasi]);
    }

    public function destroy($id)
    {
        $kategoriDestinasi = KategoriDestinasi::findOrFail($id);
        $kategoriDestinasi->delete();
        return response()->json(['message' => 'Kategori destinasi deleted successfully']);
    }
}
