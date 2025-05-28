<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Requests\StoreSMTPRequest;
use App\Http\Requests\UpdateAppInfoRequest;
use App\Services\AppSettingsService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Modules\GoogleAuth\Services\GoogleAuthService;
use Modules\Stripe\Services\PricingPlanService;

class AppSettingsController extends Controller
{

    private AppSettingsService $settingsService;
    private GoogleAuthService $googleAuthService;
    private PricingPlanService $pricingPlanService;

    public function __construct()
    {
        $this->settingsService = new AppSettingsService();
        $this->googleAuthService = new GoogleAuthService();
        $this->pricingPlanService = new PricingPlanService();
    }

    // Getting app info
    public function index()
    {
        $smtp = $this->settingsService->smtpValueStatus();
        $stripe = $this->pricingPlanService->stripeValueStatus();
        $googleAuth = $this->googleAuthService->googleAuthValueStatus();

        return Inertia::render('Dashboard/Admin/AppSettings/Index', [
             ...$smtp,
            ...$stripe,
            ...$googleAuth,
        ]);
    }

    public function show()
    {
        return Inertia::render('Dashboard/Admin/AppSettings/Global');
    }

    // Global settings for admin
    public function update(UpdateAppInfoRequest $request)
    {
        $this->settingsService->updateAppInfo($request->validated());

        return back()->with('success', 'Global settings successfully updated.');
    }

    public function show_smtp()
    {
        $smtp = $this->settingsService->smtpValueStatus();

        return Inertia::render('Dashboard/Admin/AppSettings/SMTP', $smtp);
    }

    public function store_smtp(StoreSMTPRequest $request)
    {

        ini_set('max_execution_time', 600);

        $isSMTPCorrect = $this->smtpCheck($request);

        if (!$isSMTPCorrect) {
            return back()->with('error', 'SMTP settings are incorrect.');
        }

        try {
            $escapedPassword = str_replace(
                ['\\', '"'],
                ['\\\\', '\"'],
                $request->mail_password
            );

            Artisan::call('down'); // Maintenance mode ON

            Utils::changeEnv([
                'MAIL_MAILER' => $request->mail_mailer,
                'MAIL_HOST' => $request->mail_host,
                'MAIL_PORT' => $request->mail_port,
                'MAIL_ENCRYPTION' => $request->mail_encryption,
                'MAIL_USERNAME' => $request->mail_username,
                'MAIL_PASSWORD' => '"' . $escapedPassword . '"',
                'MAIL_FROM_ADDRESS' => $request->mail_address,
                'MAIL_FROM_NAME' => $request->mail_from_name,
            ]);

            Artisan::call('up');

            return redirect(route('app-settings.index'))->with('success', "SMTP settings successfully updated.");
        } catch (\Exception $e) {
            Artisan::call('up');

            return back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function show_auth()
    {
        $googleAuth = $this->googleAuthService->googleAuthValueStatus();

        return Inertia::render('Dashboard/Admin/AppSettings/GoogleAuth', $googleAuth);
    }

    public function show_stripe()
    {
        $stripe = $this->pricingPlanService->stripeValueStatus();

        return Inertia::render('Dashboard/Admin/AppSettings/Stripe', $stripe);
    }

    private function smtpCheck(Request $request)
    {
        try {
            config([
                'mail.mailer' => $request->mail_mailer,
                'mail.host' => $request->mail_host,
                'mail.port' => $request->mail_port,
                'mail.encryption' => $request->mail_encryption,
                'mail.username' => $request->mail_username,
                'mail.password' => $request->mail_password,
                'mail.from.address' => $request->mail_address,
                'mail.from.name' => $request->mail_from_name,
            ]);

            Mail::raw('This is a test email to verify SMTP settings.', function ($message) use ($request) {
                $message->to($request->admin_email)
                    ->subject('SMTP Test Email');
            });

            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
