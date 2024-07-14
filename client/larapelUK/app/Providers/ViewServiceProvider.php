<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Menggunakan view composer untuk mengirim data pengguna ke shared.header
        View::composer('shared.header', function ($view) {
            $userPelanggan = session('user_name');
            $view->with('userPelanggan', $userPelanggan);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

