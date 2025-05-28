<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }

    /**
     * Handle an incoming change password request.
     */
    public function change(Request $request): RedirectResponse
    {
        $user = $request->user();

        $request->validate([
            'current_password' => [
                'required',
                'min:6',
                'max:20',
                function ($attribute, $value, $fail) use ($user) {
                    if (!Hash::check($value, $user->password)) {
                        $fail('The current password is incorrect.');
                    }
                },
            ],
            'password' => [
                'required',
                'min:6',
                'max:20',
                'confirmed',
                Rules\Password::defaults(), // Ensure the Password Rule is configured properly
            ],
        ]);

        try {
            $user = User::find($user->id);
            $user->password = Hash::make($request->password);
            $user->save();

            return back()->with('success', 'Password Successfully Changed');
        } catch (\Throwable $th) {
            return back()->with('error', 'Internal server error!. Try again later.');
        }
    }
}
