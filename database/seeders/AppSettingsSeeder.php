<?php

namespace Database\Seeders;

use App\Models\AppSetting;
use Illuminate\Database\Seeder;

class AppSettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AppSetting::create([
            'name' => 'LinkDrop',
            'title' => 'The One Link for All Your Links',
            'logo' => asset('assets/icons/linkdrop.png'),
            'copyright' => 'Copyrights © 2024 LinkDrop. All rights reserved.',
            'description' => 'An effective business description should include information that tells readers exactly what your company does, who is in charge of operations, and what will make your company successful.',
            'banner' => asset('banner.png'),
        ]);
    }
}
