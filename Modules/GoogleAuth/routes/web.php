<?php

use Illuminate\Support\Facades\Route;
use Modules\GoogleAuth\Http\Controllers\GoogleAuthController;
use Modules\Installer\Http\Middleware\InstalledRoutes;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::post('auth/credentials', [GoogleAuthController::class, 'credentials'])
    ->name('google-auth.credentials')
    ->middleware(InstalledRoutes::class);

Route::middleware('guest')->group(function () {
    Route::get('auth/google', [GoogleAuthController::class, 'show']);
    Route::get('auth/google/callback', [GoogleAuthController::class, 'callback']);
});
