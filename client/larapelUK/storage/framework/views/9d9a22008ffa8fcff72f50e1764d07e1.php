<!-- resources/views/auth/login.blade.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .form-signin {
        max-width: 330px;
        padding: 1rem;
        }

        .form-signin .form-floating:focus-within {
        z-index: 2;
        }

        .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        }

        .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        }
    </style>
</head>

<body>
  <br><br><br>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="h3 mb-3 fw-normal text-center">Login</h1>

          <form action="<?php echo e(route('login')); ?>" method="POST" class="form-floating">
            <?php echo csrf_field(); ?>

            <img class="mb-4 d-block mx-auto" src="https://i.pinimg.com/564x/60/48/b4/6048b4ae7f74724389d345767e8061a0.jpg" alt="" width="100" height="100">

            <div class="form-group">
              <label for="floatingInput" class="form-label">Username</label>
              <input type="text" class="form-control" id="floatingInput" placeholder="username" name="username" required>
            </div>
            <div class="form-group">
              <label for="floatingPassword" class="form-label">Password</label>
              <input type="password" class="form-control" id="floatingPassword" placeholder="password" name="password" required>
            </div>

            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-body-secondary text-center">&copy; TravelKuy Ala Ala</p>
          </form>

          <?php if(session('fail')): ?>
            <div class="alert alert-danger mt-3">
              <?php echo e(session('fail')); ?>

            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <!-- Bootstrap JS dan dependensi (jika diperlukan) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<?php /**PATH C:\Users\uts\JAKI\UT School\uji_kompetensi\client\larapelUK\resources\views/auth/login.blade.php ENDPATH**/ ?>