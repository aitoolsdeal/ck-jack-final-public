<?php

namespace App\Providers;

use App\Helpers\Utils;
use App\Http\Resources\UserResource;
use App\Models\AppSetting;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('setting', function () {
            if (Utils::isDBConnected() && Schema::hasTable('app_settings')) {
                $app = AppSetting::first();

                return $app;
            }

            return null;
        });

        $this->app->singleton('user', function () {
            if (Utils::isDBConnected() && Schema::hasTable('users')) {
                $user = Auth::user();

                if ($user) {
                    $user = new UserResource(User::find($user->id));
                }

                return $user;
            }

            return null;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }

}
