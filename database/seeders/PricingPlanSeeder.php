<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Stripe\Models\PricingPlan;
use Modules\Stripe\Models\PricingPlanFeature;

class PricingPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $plan = PricingPlan::create([
            'type' => 'free',
            'title' => 'Basic',
            'description' => 'Free pricing plan for basic use.',
        ]);

        $planFeatures = PricingPlanFeature::create([
            "biolinks" => "10",
            "biolink_blocks" => 4,
            "shortlinks" => "10",
            "projects" => "10",
            "qrcodes" => "10",
            "themes" => "Free",
            "custom_theme" => 0,
            "support" => 72,
            'pricing_plan_id' => $plan->id,
        ]);

        $plan->update(['pricing_feature_id' => $planFeatures->id]);
    }
}
