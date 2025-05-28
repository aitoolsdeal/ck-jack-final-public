<?php

namespace Modules\GoogleAuth\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Modules\GoogleAuth\Http\Requests\AuthCredentialsRequest;
use Modules\GoogleAuth\Services\GoogleAuthService;

class GoogleAuthController extends Controller
{
    public GoogleAuthService $authService;

    public function __construct()
    {
        $this->authService = new GoogleAuthService();
    }

    public function credentials(AuthCredentialsRequest $request)
    {
        try {
            Artisan::call('down'); // Maintenance mode ON

            Utils::changeEnv([
                'GOOGLE_CLIENT_ID' => '"' . $request->google_client_id . '"',
                'GOOGLE_CLIENT_SECRET' => '"' . $request->google_client_secret . '"',
                'GOOGLE_REDIRECT_URI' => '"' . $request->google_redirect_uri . '"',
            ]);

            Artisan::call('up');

            return back()->with('success', 'Google Auth credentials have been updated.');
        } catch (\Exception $e) {
            Artisan::call('up');

            return back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    /**
     * Show the google sighup/login form.
     */
    public function show()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Back to the specific route after login.
     */
    public function callback()
    {
        try {
            $user = Socialite::driver('google')->user();
            $registered = User::where('google_id', $user->id)->first();

            if ($registered) {
                Auth::login($registered, true);
            } else {
                $newUser = $this->authService->register($user);

                event(new Registered($newUser));
                Auth::login($newUser, true);
            }

            return redirect('/dashboard');
        } catch (\Throwable $th) {
            return redirect('/login');
        }
    }
}
