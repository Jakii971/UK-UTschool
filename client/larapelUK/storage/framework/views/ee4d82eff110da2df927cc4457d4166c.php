
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
                    <img src="https://avatar.iran.liara.run/public/boy?username=<?php echo e($userPelanggan); ?>" alt="Profile Image" class="profile-image" width="100" height="100">
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>ID:</strong> <?php echo e(isset($userId) ? $userId : ''); ?></li>
                    <li class="list-group-item"><strong>Username:</strong> <?php echo e(isset($userName) ? $userName : ''); ?></li>
                    <li class="list-group-item"><strong>Nama Pelanggan:</strong> <?php echo e(isset($userPelanggan) ? $userPelanggan : ''); ?></li>
                    <li class="list-group-item"><strong>Alamat:</strong> <?php echo e(isset($userAddress) ? $userAddress : ''); ?></li>
                    <li class="list-group-item"><strong>No Telepon:</strong> <?php echo e(isset($userPhone) ? $userPhone : ''); ?></li>
                </ul>
                <div class="d-flex justify-content-between mt-3">
                    <button onclick="history.back()" class="btn btn-secondary">Back</button>
                    <?php if(session()->has('user_id')): ?>
                        <form action="<?php echo e(route('logout')); ?>" method="POST">
                            <?php echo csrf_field(); ?>
                            <button type="submit" class="btn btn-danger">Logout</button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>


<?php /**PATH C:\Users\uts\JAKI\UT School\uji_kompetensi\client\larapelUK\resources\views/profile.blade.php ENDPATH**/ ?>