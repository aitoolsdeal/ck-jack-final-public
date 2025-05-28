<?php

namespace Database\Seeders;

use App\Enums\UserType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('12345678'),
            'role' => UserType::ADMIN,
        ]);

        // User::create([
        //     'name' => 'User',
        //     'email' => 'user@gmail.com',
        //     'email_verified_at' => now(),
        //     'password' => Hash::make('12345678'),
        //     'role' => UserType::USER,
        //     'pricing_plan_id' => PricingPlan::where('type', 'free')->first()->id,
        // ]);
    }
}
