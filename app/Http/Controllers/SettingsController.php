<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateEmailRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    protected SettingService $settingService;

    public function __construct()
    {
        $this->settingService = new SettingService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard/Settings/Show');
    }

    /**
     * Update the logged in user profile.
     */
    public function profile(UpdateProfileRequest $request)
    {
        $this->settingService->updateProfile($request->validated());

        return back()->with('success', 'Profile Successfully Updated.');
    }

    /**
     * Change the specified user email.
     */
    public function changeEmail(UpdateEmailRequest $request)
    {
        $this->settingService->changeEmail($request->validated());

        return back()->with('success', 'We have sent a email verification link to your new email account.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function saveEmail(Request $request)
    {
        $saved = $this->settingService->saveChangedEmail($request->token);

        if (!$saved) {
            return redirect()->route('settings.index')
                ->with('error', "Verification token didn't match or expire.");
        }

        return redirect()->route('settings.index')
            ->with('success', "New email successfully changed.");
    }
}
