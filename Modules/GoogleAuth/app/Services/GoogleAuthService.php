<?php

namespace Modules\GoogleAuth\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class GoogleAuthService
{
    public function googleAuthValueStatus()
    {
        $googleAuthStatus = false;
        $googleClientID = config('services.google.client_id');
        $googleClientSecret = config('services.google.client_secret');
        $googleRedirectURI = config('services.google.redirect');

        if (!empty($googleClientID) && !empty($googleClientSecret) && !empty($googleRedirectURI)) {
            $googleAuthStatus = true;
        }

        return [
            'googleAuthStatus' => $googleAuthStatus,
            'googleClientID' => $googleClientID,
            'googleClientSecret' => $googleClientSecret,
            'googleRedirectURI' => $googleRedirectURI,
        ];
    }

    public function register(object $user): User
    {
        return DB::transaction(function () use ($user) {
            $newUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->avatar,
                'email_verified_at' => now(),
                'password' => Hash::make('googleauth'),
                'google_id' => $user->id,
            ]);

            return $newUser;
        }, 5);
    }
}
