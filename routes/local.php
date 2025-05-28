<?php

use App\Http\Controllers\LocalizationController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;

Route::middleware([Admin::class])->prefix('dashboard')->group(function () {
    Route::resource('translation', LocalizationController::class)->only(['index', 'edit']);

    Route::get('/lang/{local}', [LocalizationController::class, 'change'])->name('lang.change');
    Route::post('/lang/add', [LocalizationController::class, 'create'])->name('lang.create');
    Route::put('/lang/update/{local}/{file}', [LocalizationController::class, 'update'])->name('lang.update');
    Route::put('/lang/status/{local}', [LocalizationController::class, 'status'])->name('lang.status');
});
