<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Paket;

class PaketController extends Controller
{
    /** 
    public function index()
    {
        $pakets = Paket::all();
        return response()->json(['data' => $pakets]);
    }
    */
    public function index($id_subkategori)
    {
        $pakets = Paket::where('id_subkategori', $id_subkategori)->get();
        return view('paket.index', compact('pakets'));
    }

    public function store(Request $request)
    {
        $paket = Paket::create($request->all());
        return response()->json(['data' => $paket], 201);
    }

    public function show($id)
    {
        $paket = Paket::findOrFail($id);
        return response()->json(['data' => $paket]);
    }

    public function update(Request $request, $id)
    {
        $paket = Paket::findOrFail($id);
        $paket->update($request->all());
        return response()->json(['data' => $paket]);
    }

    public function destroy($id)
    {
        $paket = Paket::findOrFail($id);
        $paket->delete();
        return response()->json(['message' => 'Paket deleted successfully']);
    }
}
