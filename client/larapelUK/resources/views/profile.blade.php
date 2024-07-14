{{-- @extends('layouts.app')

@section('content')
<body>
    <h1>Profil Pengguna</h1>
    <table border="1">
        <tr>
            <th>ID</th>
            <td>{{ isset($userId) ? $userId : '' }}</td>
        </tr>
        <tr>
            <th>Username</th>
            <td>{{ isset($userName) ? $userName : '' }}</td>
        </tr>
        <tr>
            <th>Nama Pelanggan</th>
            <td>{{ isset($userPelanggan) ? $userPelanggan : '' }}</td>
        </tr>
        <tr>
            <th>Alamat</th>
            <td>{{ isset($userAddress) ? $userAddress : '' }}</td>
        </tr>
        <tr>
            <th>No Telepon</th>
            <td>{{ isset($userPhone) ? $userPhone : '' }}</td>
        </tr>
    </table>

    <div class="d-flex justify-content-end my-3">
			@if(session()->has('user_id'))
					<form action="{{ route('logout') }}" method="POST">
							@csrf
							<button type="submit" class="btn btn-danger">Logout</button>
					</form>
			@endif
		</div>



@endsection --}}
<!-- resources/views/profile.blade.php -->

<!-- resources/views/profile.blade.php -->

<!-- resources/views/profile.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>Profil Pengguna</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .profile-image {
            border-radius: 50%;
            margin-right: 20px;
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h1 class="card-title">Profil Pengguna</h1>
                </div>
                <div class="profile-header">
                    <img src="https://avatar.iran.liara.run/public/boy?username={{$userPelanggan}}" alt="Profile Image" class="profile-image" width="100" height="100">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>ID:</strong> {{ isset($userId) ? $userId : '' }}</li>
                    <li class="list-group-item"><strong>Username:</strong> {{ isset($userName) ? $userName : '' }}</li>
                    <li class="list-group-item"><strong>Nama Pelanggan:</strong> {{ isset($userPelanggan) ? $userPelanggan : '' }}</li>
                    <li class="list-group-item"><strong>Alamat:</strong> {{ isset($userAddress) ? $userAddress : '' }}</li>
                    <li class="list-group-item"><strong>No Telepon:</strong> {{ isset($userPhone) ? $userPhone : '' }}</li>
                </ul>
                <div class="d-flex justify-content-between mt-3">
                    <button onclick="history.back()" class="btn btn-secondary">Back</button>
                    @if(session()->has('user_id'))
                        <form action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button type="submit" class="btn btn-danger">Logout</button>
                        </form>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>


