<?php

namespace App\Services;

use App\Mail\ChangeEmailVerification;
use App\Models\PasswordResetToken;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SettingService extends MediaService
{
    public function updateProfile(array $data)
    {
        DB::transaction(function () use ($data) {
            $user = User::find(app('user')->id);

            $user->name = $data['name'];

            if (array_key_exists('image', $data) && $data['image']) {
                $fullUrl = $this->addNewDeletePrev($user, $data['image'], 'profile');

                $user->image = $fullUrl;
            }

            $user->save();
        }, 5);
    }

    public function changeEmail(array $data)
    {
        DB::transaction(function () use ($data) {
            $app = app('setting');
            $user = User::find(app('user')->id);

            // Generate a unique token for email verification
            $token = Str::random(60);
            $url = route('save.email', ['token' => $token]);

            PasswordResetToken::create([
                'email' => $data['new_email'],
                'user_id' => $user->id,
                'token' => $token,
            ]);

            $user->updated_at = now();
            $user->save();

            // Send an email with the verification link to the new email
            Mail::to($data['new_email'])->send(new ChangeEmailVerification($user, $app, $url));
        }, 5);
    }

    public function saveChangedEmail(string $token): bool
    {
        return DB::transaction(function () use ($token) {
            $user = User::find(app('user')->id); // Retrieve the authenticated user

            $reset = PasswordResetToken::where('user_id', $user->id)->first();

            // Validate if the reset token exists
            if (!$reset) {
                return false;
            }

            // Verify the token securely
            if (!hash_equals($reset->token, $token)) {
                return false;
            }

            // Check if the user was updated within 5 minutes
            $within5Minutes = $user->updated_at->diffInMinutes(Carbon::now()) <= 5;

            if ($within5Minutes) {
                $user->email = $reset->email;
                $user->save();
                $reset->delete(); // Delete the token after use
            }

            return $within5Minutes;
        }, 5);
    }

}
