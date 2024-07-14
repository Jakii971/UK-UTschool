<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SubkategoriDestinasi;

class SubkategoriDestinasiController extends Controller
{
    public function index($id_kategori)
    {
        // Ambil data subkategori berdasarkan id_kategori
        $subkategoris = SubkategoriDestinasi::where('id_kategori', $id_kategori)->get();
        
        // Tampilkan view subkategori dengan mengirimkan data subkategoris
        return view('subkategori.index', compact('subkategoris'));
    }

    public function store(Request $request)
    {
        $subkategoriDestinasi = SubkategoriDestinasi::create($request->all());
        return response()->json(['data' => $subkategoriDestinasi], 201);
    }

    public function show($id)
    {
        $subkategoriDestinasi = SubkategoriDestinasi::findOrFail($id);
        return response()->json(['data' => $subkategoriDestinasi]);
    }

    public function update(Request $request, $id)
    {
        $subkategoriDestinasi = SubkategoriDestinasi::findOrFail($id);
        $subkategoriDestinasi->update($request->all());
        return response()->json(['data' => $subkategoriDestinasi]);
    }

    public function destroy($id)
    {
        $subkategoriDestinasi = SubkategoriDestinasi::findOrFail($id);
        $subkategoriDestinasi->delete();
        return response()->json(['message' => 'Subkategori destinasi deleted successfully']);
    }
}
