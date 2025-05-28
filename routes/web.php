<?php

use App\Http\Controllers\AppSettingsController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\BioLinkBlockController;
use App\Http\Controllers\BioLinkController;
use App\Http\Controllers\BioLinkCustomizeController;
use App\Http\Controllers\BioLinkCustomThemeController;
use App\Http\Controllers\CustomPageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\QRCodeController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\ShortLinkController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\UsersController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Middleware\InstalledRoutes;

Route::middleware(InstalledRoutes::class)->group(function () {
    require __DIR__ . '/auth.php';
    require __DIR__ . '/local.php';

    Route::get('/', [HomeController::class, 'index']);

    Route::middleware('auth', 'verified')->prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('bio-links', BioLinkController::class)->only(['index', 'store', 'update', 'destroy']);

        Route::prefix('bio-links')->group(function () {
            Route::get('export', [BioLinkController::class, 'export'])->name('bio-links.export');

            Route::resource('customize', BioLinkCustomizeController::class)->only(['store', 'show', 'update']);
            Route::prefix('customize')->group(function () {
                Route::post('logo/{id}', [BioLinkCustomizeController::class, 'logo'])->name('customize.logo');
                Route::put('socials/{id}', [BioLinkCustomizeController::class, 'social'])->name('customize.socials');

                Route::prefix('custom-theme')->group(function () {
                    Route::post('/', [BioLinkCustomThemeController::class, 'store'])->name('custom-theme.store');
                    Route::put('/{id}', [BioLinkCustomThemeController::class, 'active'])->name('custom-theme.active');
                    Route::post('/{id}', [BioLinkCustomThemeController::class, 'update'])->name('custom-theme.update');
                });

                Route::resource('biolink-block', BioLinkBlockController::class)->only(['store', 'destroy']);
                Route::post('block/{id}', [BioLinkBlockController::class, 'update'])->name('biolink-block.update');
                Route::put('block/{linkId}', [BioLinkBlockController::class, 'position'])->name('biolink-block.position');
            });
        });

        Route::resource('short-links', ShortLinkController::class)->only(['index', 'update', 'destroy']);
        Route::post('short-links', [ShortLinkController::class, 'store'])->name('short-links.store');
        Route::get('short-links/export', [ShortLinkController::class, 'export'])->name('short-links.export');

        Route::resource('qrcodes', QRCodeController::class)->only(['index', 'destroy']);
        Route::get('qrcodes/create', [QRCodeController::class, 'create'])->name('qrcodes.create');
        Route::post('qrcodes', [QRCodeController::class, 'store'])->name('qrcodes.store');

        Route::resource('projects', ProjectController::class)->only(['index', 'create', 'show', 'update', 'destroy']);
        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::get('projects/export', [ProjectController::class, 'export'])->name('projects.export');

        Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');

        Route::prefix('settings')->group(function () {
            Route::get('/', [SettingsController::class, 'index'])->name('settings.index');
            Route::post('profile', [SettingsController::class, 'profile'])->name('settings.profile');
            Route::post('change-email', [SettingsController::class, 'changeEmail'])->name('settings.change-email');
            Route::get('change-email/save', [SettingsController::class, 'saveEmail'])->name('settings.save-email');
            Route::put('update-password', [PasswordController::class, 'update'])->name('password.update');
            Route::post('change-password', [PasswordController::class, 'change'])->name('password.change');
        });

        Route::middleware([Admin::class])->group(function () {
            Route::post('home-section/{id}', [HomeController::class, 'section'])->name('home-section.update');
            Route::put('home-section/list/{id}', [HomeController::class, 'sectionList'])->name('home-section.list');

            Route::resource('users', UsersController::class)->only(['index', 'update']);
            Route::get('users/export', [UsersController::class, 'export'])->name('users.export');

            Route::get('manage-themes', [ThemeController::class, 'index'])->name('manage-themes.index');
            Route::put('manage-themes/type/{id}', [ThemeController::class, 'theme_type'])->name('manage-themes.type');

            Route::resource('testimonials', TestimonialController::class)->only(['index', 'store', 'destroy']);
            Route::post('testimonials/{id}', [TestimonialController::class, 'update'])->name('testimonials.update');

            Route::prefix('app-settings')->group(function () {
                Route::get('/', [AppSettingsController::class, 'index'])->name('app-settings.index');
                Route::get('global', [AppSettingsController::class, 'show'])->name('app-settings.show');
                Route::post('update', [AppSettingsController::class, 'update'])->name('app-settings.update');
                Route::get('smtp', [AppSettingsController::class, 'show_smtp'])->name('app-settings.show_smtp');
                Route::post('smtp', [AppSettingsController::class, 'store_smtp'])->name('app-settings.store_smtp');
                Route::get('auth', [AppSettingsController::class, 'show_auth'])->name('app-settings.show_auth');
                Route::get('stripe', [AppSettingsController::class, 'show_stripe'])->name('app-settings.show_stripe');
            });

            Route::resource('custom-page', CustomPageController::class);
        });
    });

    Route::get('/app/{page}', [CustomPageController::class, 'show'])->name('custom-page.view');
});
