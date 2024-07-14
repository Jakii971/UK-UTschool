<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buat Transaksi</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        /* Style untuk menengahkan container */
        body, html {
            height: 100%;
            padding: 50px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            background-color: #f8f9fa; /* Warna latar belakang */
        }
        .profile-card {
            width: 400px; /* Lebar card profil */
            background-color: #ffffff; /* Warna latar card */
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1); /* Bayangan card */
            padding: 20px; /* Padding konten dalam card */
            text-align: center; /* Teks rata tengah */
            margin-right: 30px; /* Jarak kanan dengan card form */
        }
        .profile-image {
            width: 150px; /* Lebar gambar profil */
            height: 150px; /* Tinggi gambar profil */
            border-radius: 50%; /* Bentuk lingkaran */
            margin-bottom: 20px; /* Jarak bawah gambar profil */
            object-fit: cover; /* Penuhkan area gambar */
        }
        .profile-details {
            margin-bottom: 20px; /* Jarak bawah detail profil */
        }
        .form-card {
            width: 600px; /* Lebar card form */
            background-color: #ffffff; /* Warna latar card */
            box-shadow: 0px 0px 10px rgba(0,0,0,0.1); /* Bayangan card */
            padding: 30px; /* Padding konten dalam card */
        }
        .form-group {
            margin-bottom: 20px; /* Jarak antar form group */
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="d-flex justify-content-center mb-4">
            <a href="{{ route('kategori-destinasi.index') }}" class="btn btn-primary mb-3">Kembali ke Halaman Kategori</a>
        </div>
        <div class="d-flex justify-content-center">
            <!-- Card untuk profil pengguna -->
            <div class="card profile-card">
                <div class="card-body">
                    <h1 class="mt-4">Profil Pengguna</h1>
                    <img src="https://avatar.iran.liara.run/public/boy?username={{ $userPelanggan }}" alt="Profile Image" class="profile-image mt-4">
                    <div class="profile-details mt-4">
                        <p><strong>Nama Pelanggan:</strong> {{ isset($userPelanggan) ? $userPelanggan : '' }}</p>
                        <p><strong>Alamat:</strong> {{ isset($userAddress) ? $userAddress : '' }}</p>
                        <p><strong>No Telepon:</strong> {{ isset($userPhone) ? $userPhone : '' }}</p>
                    </div>
                </div>
            </div>

            <!-- Card untuk form transaksi -->
            <div class="card form-card ml-4">
                <div class="card-body">
                    <h1 class="mt-4">Buat Transaksi</h1>
                    <form id="formTransaksi" action="{{ route('transaksi.store') }}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label for="user_id">ID User</label>
                            <input type="text" class="form-control" id="username" value="{{ isset($userName) ? $userName : '' }}" readonly>
                            <input type="text" class="form-control" name="user_id" id="user_id" value="{{ isset($userId) ? $userId : '' }}" hidden>
                        </div>
                        <div class="form-group">
                            <label for="paket_id">Paket</label>
                            <input type="text" class="form-control" id="paket_id" value="{{ isset($paket) ? $paket->nama_paket : '' }}" readonly>
                            <input type="hidden" name="paket_id" value="{{ isset($paket) ? $paket->id : '' }}">
                        </div>
                        <div class="form-group">
                            <label for="jumlah_harga">Jumlah Harga</label>
                            <input type="number" class="form-control" id="jumlah_harga" name="jumlah_harga" value="{{ isset($paket) ? $paket->harga : '' }}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="tanggal_transaksi">Pilih Tanggal Pembayaran</label>
                            <input type="date" class="form-control" id="tanggal_transaksi" name="tanggal_transaksi" required>
                        </div>
                        <button type="submit" class="btn btn-primary flex-end">Buat Transaksi</button>
                    </form>
                </div>
            </div>
        </div>
        <br><br>
        <br><br>
        <br><br>
    </div>

    <!-- Modal QR Code -->
    <div class="modal fade" id="modalQR" tabindex="-1" role="dialog" aria-labelledby="modalQRLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalQRLabel">Bayar Cepet, Healing Cepet!!!</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img id="qrCodeImage" src="{{ asset('images/QR.png') }}" alt="QR Code" class="img-fluid">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Tutup</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>

    <script>
        // Handle form submission
        $('#formTransaksi').submit(function(event) {
            event.preventDefault(); // Prevent the form from submitting normally

            // Submit the form via AJAX
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
                success: function(response) {
                    // If successful, display QR code in modal
                    $('#qrCodeImage').attr('src', response.qr_code_url);
                    $('#modalQR').modal({
                        backdrop: 'static', // Prevent modal from closing when clicking outside
                        keyboard: false // Prevent modal from closing when pressing Esc key
                    }).modal('show');
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                    alert('Terjadi kesalahan saat membuat transaksi. Silakan coba lagi.');
                }
            });
        });
    </script>
</body>


</html>
