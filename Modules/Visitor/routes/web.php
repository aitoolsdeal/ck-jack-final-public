<?php

use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Middleware\InstalledRoutes;
use Modules\Visitor\Http\Controllers\VisitorController;

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
Route::middleware(InstalledRoutes::class)->group(function () {
    Route::get('/{linkName}', [VisitorController::class, 'index'])->name('link.visit');
    Route::get('/link/analytics/{id}', [VisitorController::class, 'analytics'])->name('link.analytics');
});
