<?php

namespace App\Services;

use App\Models\AppSetting;
use Illuminate\Support\Facades\DB;

class AppSettingsService extends MediaService
{
    public function smtpValueStatus()
    {
        $smtpStatus = false;

        $mailHost = config('mail.mailers.smtp.host');
        $mailPort = config('mail.mailers.smtp.port');
        $mailEncryption = config('mail.mailers.smtp.encryption');
        $mailUsername = config('mail.mailers.smtp.username');
        $mailPassword = config('mail.mailers.smtp.password');
        $mailFromAddress = config('mail.from.address');
        $mailFromName = config('mail.from.name');

        if (
            !empty($mailHost)
            && !empty($mailPort)
            && !empty($mailEncryption)
            && !empty($mailUsername)
            && !empty($mailPassword)
            && !empty($mailFromAddress)
            && !empty($mailFromName)
        ) {
            $smtpStatus = true;
        }

        return [
            'smtpStatus' => $smtpStatus,
            'mailHost' => $mailHost,
            'mailPort' => $mailPort,
            'mailEncryption' => $mailEncryption,
            'mailUsername' => $mailUsername,
            'mailPassword' => $mailPassword,
            'mailFromAddress' => $mailFromAddress,
            'mailFromName' => $mailFromName,
        ];
    }

    public function updateAppInfo(array $data)
    {
        DB::transaction(function () use ($data) {
            $app = app('setting');

            $app->update([
                'title' => $data['title'],
                'copyright' => $data['copyright'],
                'description' => $data['description'],
            ]);

            if ($data['logo']) {
                $fullUrl = $this->addNewDeletePrev(AppSetting::first(), $data['logo']);

                $app->update(['logo' => $fullUrl]);
            }

            // app()->singleton('setting', fn() => $app);
        }, 5);
    }
}
