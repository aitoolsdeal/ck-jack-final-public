<?php

namespace Modules\Stripe\Services;

use Illuminate\Support\Facades\DB;
use Modules\Stripe\Models\PricingPlan;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class PricingPlanService
{
    public function stripeValueStatus()
    {
        $stripeStatus = false;
        $stripeKey = config('stripe.stripe_key');
        $stripeSecret = config('stripe.stripe_secret');
        $stripeWebhookSecret = config('stripe.stripe_webhook_secret');

        if (!empty($stripeKey) && !empty($stripeSecret) && !empty($stripeWebhookSecret)) {
            $stripeStatus = true;
        }

        return [
            'stripeStatus' => $stripeStatus,
            'stripeKey' => $stripeKey,
            'stripeSecret' => $stripeSecret,
            'stripeWebhookSecret' => $stripeWebhookSecret,
        ];
    }

    public function pricingPlans()
    {
        return DB::transaction(function () {
            $plans = PricingPlan::query()
                ->with('pricing_features')
                ->get()
                ->each(function ($plan) {
                    if ($plan->type == 'paid') {
                        Stripe::setApiKey(config('stripe.stripe_secret'));

                        $plan->product = Product::retrieve($plan->stripe_product_id);
                        $plan->price = Price::retrieve($plan->stripe_product_price_id);
                    }
                });

            return $plans;
        }, 5);
    }

    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            PricingPlan::create($data);
        }, 5);
    }

    public function update(string $id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            PricingPlan::find($id)->update($data);
        }, 5);
    }
}
