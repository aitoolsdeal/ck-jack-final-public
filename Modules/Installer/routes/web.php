<?php

use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Controllers\InstallerController;
use Modules\Installer\Http\Controllers\InstallerDBController;
use Modules\Installer\Http\Middleware\InstallerRoutes;

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

config(['session.driver' => 'file']);

Route::middleware(InstallerRoutes::class)->group(function () {
    Route::get('install/step-1', [InstallerController::class, 'index'])->name('install.index');

    Route::get('install/step-2', [InstallerController::class, 'show_step2'])->name('install.show-step2');
    Route::post('install/step-2', [InstallerController::class, 'store_step2'])->name('install.store-step2');

    Route::get('install/step-3', [InstallerController::class, 'show_step3'])->name('install.show-step3');
    Route::post('install/step-3', [InstallerController::class, 'store_step3'])->name('install.store-step3');

    Route::get('install/install', [InstallerController::class, 'show_step4'])->name('install.show-step4');
    Route::post('install/install', [InstallerController::class, 'store_step4'])->name('install.store-step4');

    Route::post('install/check-database', [InstallerDBController::class, 'databaseChecker'])->name('check-database');
    Route::get('install/generate-app-key', [InstallerController::class, 'generateAppKey'])->name('generate-app-key');

    Route::get('install/finish', [InstallerController::class, 'finish'])->name('install.finish');
});
