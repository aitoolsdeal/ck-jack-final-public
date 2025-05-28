<?php

namespace Modules\Installer\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
// use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Modules\Installer\Http\Requests\StoreStep2Request;
use Modules\Installer\Http\Requests\StoreStep3Request;

class InstallerController extends Controller
{

    public function index()
    {
        $current_version = PHP_VERSION;
        $require_version = '8.2';
        $allValuesAreTrue = true;

        $requirements = [
            'current_php_version' => $current_version,
            'required_php_version' => $require_version,
            'php_version' => version_compare($current_version, $require_version, '>='),
            'openssl_enabled' => extension_loaded('openssl'),
            'pdo_enabled' => defined('PDO::ATTR_DRIVER_NAME'),
            'mbstring_enabled' => extension_loaded('mbstring'),
            'curl_enabled' => extension_loaded('curl'),
            'tokenizer_enabled' => extension_loaded('tokenizer'),
            'xml_enabled' => extension_loaded('xml'),
            'ctype_enabled' => extension_loaded('ctype'),
            'fileinfo_enabled' => extension_loaded('fileinfo'),
            'gd_enabled' => extension_loaded('gd'),
            'json_enabled' => extension_loaded('json'),
            'bcmath_enabled' => extension_loaded('bcmath'),
        ];

        foreach ($requirements as $item) {
            if (!$item) {
                $allValuesAreTrue = false;
                break;
            }
        }

        return Inertia::render('Installer/Step1', compact('allValuesAreTrue', 'requirements'));
    }

    public function show_step2(Request $request)
    {
        $APP_NAME = session('APP_NAME') ?? config('app.name');
        $APP_ENV = session('APP_ENV') ?? config('app.env');
        $APP_DEBUG = session('APP_DEBUG') ?? config('app.debug');
        $APP_KEY = $request->APP_KEY ?? (session('APP_KEY') ?? config('app.key'));
        $APP_TIMEZONE = session('APP_TIMEZONE') ?? config('app.timezone');
        $APP_URL = session('APP_URL') ?? config('app.url');

        return Inertia::render('Installer/Step2', compact(
            'APP_NAME',
            'APP_ENV',
            'APP_DEBUG',
            'APP_KEY',
            'APP_TIMEZONE',
            'APP_URL',
        ));
    }

    public function store_step2(StoreStep2Request $request)
    {
        session()->put('APP_ENV', $request->app_env);
        session()->put('APP_DEBUG', $request->app_debug);
        session()->put('APP_NAME', '"' . $request->app_name . '"');
        session()->put('APP_KEY', $request->app_key);
        session()->put('APP_TIMEZONE', '"' . $request->app_timezone . '"');
        session()->put('APP_URL', $request->app_url);

        return redirect()->route('install.show-step3');
    }

    public function show_step3(Request $request)
    {
        if (config("database.default") == 'mysql') {
            $db = config('database.connections.mysql');
        }

        $DB_CONNECTION = session('DB_CONNECTION') ?? config("database.default");
        $DB_HOST = session('DB_HOST') ?? (isset($db['host']) ? $db['host'] : '');
        $DB_PORT = session('DB_PORT') ?? (isset($db['port']) ? $db['port'] : '');
        $DB_DATABASE = session('DB_DATABASE') ?? (isset($db['database']) ? $db['database'] : '');
        $DB_USERNAME = session('DB_USERNAME') ?? (isset($db['username']) ? $db['username'] : '');
        $DB_PASSWORD = session('DB_PASSWORD') ? str_replace('"', '', session('DB_PASSWORD')) : (isset($db['password']) ? str_replace('"', '', $db['password']) : '');
        $DB_CONNECTION_STATUS = $request->connection_status ?? false;

        return Inertia::render('Installer/Step3', compact(
            'DB_CONNECTION',
            'DB_HOST',
            'DB_PORT',
            'DB_DATABASE',
            'DB_USERNAME',
            'DB_PASSWORD',
            'DB_CONNECTION_STATUS',
        ));
    }

    public function store_step3(StoreStep3Request $request)
    {
        session()->put('DB_CONNECTION', $request->db_connection);
        session()->put('DB_HOST', $request->db_host);
        session()->put('DB_PORT', $request->db_port);
        session()->put('DB_DATABASE', $request->db_database);
        session()->put('DB_USERNAME', $request->db_username);
        session()->put('DB_PASSWORD', '"' . $request->db_password . '"');

        return redirect()->route('install.show-step4');
    }

    public function show_step4()
    {
        if (!session('db_connection')) {
            return redirect(route('install.show-step3'));
        }

        return Inertia::render('Installer/Step4');
    }

    public function store_step4()
    {
        ini_set('max_execution_time', 600);

        try {
            Artisan::call('down'); // Maintenance mode ON

            Utils::changeEnv([
                'APP_NAME' => session('APP_NAME'),
                'APP_ENV' => session('APP_ENV'),
                'APP_KEY' => session('APP_KEY'),
                'APP_DEBUG' => session('APP_DEBUG') ? 'true' : 'false',
                'APP_TIMEZONE' => session('APP_TIMEZONE'),
                'APP_URL' => session('APP_URL'),

                'DB_CONNECTION' => session('DB_CONNECTION'),
                'DB_HOST' => session('DB_HOST'),
                'DB_PORT' => session('DB_PORT'),
                'DB_DATABASE' => session('DB_DATABASE'),
                'DB_USERNAME' => session('DB_USERNAME'),
                'DB_PASSWORD' => session('DB_PASSWORD'),

                'MAIL_MAILER' => session('MAIL_MAILER'),
                'MAIL_HOST' => session('MAIL_HOST'),
                'MAIL_PORT' => session('MAIL_PORT'),
                'MAIL_ENCRYPTION' => session('MAIL_ENCRYPTION'),
                'MAIL_USERNAME' => session('MAIL_USERNAME'),
                'MAIL_PASSWORD' => session('MAIL_PASSWORD'),
                'MAIL_FROM_ADDRESS' => session('MAIL_FROM_ADDRESS'),
                'MAIL_FROM_NAME' => session('MAIL_FROM_NAME'),
            ]);

            Artisan::call('up');

            return redirect(route('install.finish'));
        } catch (\Exception $e) {
            Artisan::call('up');

            return back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    public function finish()
    {
        ini_set('max_execution_time', 600);

        try {
            Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);

            // // Create a copy of the storage folder in the public directory
            // if (!file_exists(public_path('storage'))) {
            //     File::copyDirectory(storage_path('app/public'), public_path('storage'));
            // }
            Artisan::call('storage:link');

            Artisan::call('optimize:clear');
            Storage::disk('public')->put('installed', 'Contents');

            return Inertia::render('Installer/Finish');
        } catch (\Throwable $th) {
            return back()->with('error', 'Error: ' . $th->getMessage());
        }
    }

    public function generateAppKey()
    {
        Artisan::call('key:generate', ['--show' => true]);
        $output = (Artisan::output());
        $output = substr($output, 0, -2);

        // return Inertia::render('', compact('APP_KEY'))
        return redirect()->route('install.show-step2', ['APP_KEY' => $output]);
    }
}
