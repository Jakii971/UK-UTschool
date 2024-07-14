<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;

class UsersController extends Controller
{
    public function index()
    {
        $users = Users::all();
        return response()->json(['data' => $users]);
    }

    public function store(Request $request)
    {
        $user = Users::create($request->all());
        return response()->json(['data' => $user], 201);
    }

    public function show($id)
    {
        $user = Users::findOrFail($id);
        return response()->json(['data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = Users::findOrFail($id);
        $user->update($request->all());
        return response()->json(['data' => $user]);
    }

    public function destroy($id)
    {
        $user = Users::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
