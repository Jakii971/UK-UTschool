<!-- resources/views/transaksi/create.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buat Transaksi</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container">
        <h1 class="mt-4">Buat Transaksi</h1>
        <form action="{{ route('transaksi.store') }}" method="POST">
            @csrf
            <div class="form-group">
                <label for="nama_pelanggan">Nama Pelanggan</label>
                <input type="text" class="form-control" id="nama_pelanggan" value="{{ $user->nama_pelanggan }}" readonly>
                <input type="hidden" name="user_id" value="{{ $user->id }}">
            </div>
            <div class="form-group">
                <label for="alamat">Alamat</label>
                <input type="text" class="form-control" id="alamat" value="{{ $user->alamat }}" readonly>
            </div>
            <div class="form-group">
                <label for="no_telp">Nomor Telepon</label>
                <input type="text" class="form-control" id="no_telp" value="{{ $user->no_telp }}" readonly>
            </div>
            <div class="form-group">
                <label for="nama_paket">Nama Paket</label>
                <input type="text" class="form-control" id="nama_paket" value="{{ $paket->nama_paket }}" readonly>
                <input type="hidden" name="paket_id" value="{{ $paket->id }}">
            </div>
            <div class="form-group">
                <label for="tanggal_transaksi">Tanggal Transaksi</label>
                <input type="date" class="form-control" id="tanggal_transaksi" name="tanggal_transaksi" required>
            </div>
            <div class="form-group">
                <label for="jumlah_harga">Jumlah Harga</label>
                <input type="number" class="form-control" id="jumlah_harga" name="jumlah_harga" value="{{ $paket->harga }}" readonly>
            </div>
            <button type="submit" class="btn btn-primary">Buat Transaksi</button>
        </form>
    </div>

    <!-- Bootstrap JS dan dependensi (jika diperlukan) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
</body>
</html>