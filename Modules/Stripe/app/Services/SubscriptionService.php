<?php

namespace Modules\Stripe\Services;

use App\Enums\PlanType;
use App\Helpers\Role;
use App\Models\User;
use Modules\Stripe\Models\PricingPlan;
use Stripe\Stripe;
use Stripe\Subscription;

class SubscriptionService
{
    function __construct()
    {
        Stripe::setApiKey(config('stripe.stripe_secret'));
    }

    public function subscriptions()
    {
        if (Role::isAdmin()) {

            return Subscription::all();
        } else {
            if (app('user')->pricing_plan->type == PlanType::FREE->value) {
                return [];
            } else {
                return Subscription::all(['customer' => app('user')->stripe_id]);
            }
        }
    }

    public function statusHandler(string $id, bool $cancel_at_period_end)
    {
        if (!$cancel_at_period_end) {
            Subscription::update($id, [
                'cancel_at_period_end' => true,
            ]);
        } else {
            Subscription::update($id, [
                'cancel_at_period_end' => false,
            ]);
        }
    }

    public function cancelNow(string $id)
    {
        $subscription = Subscription::retrieve($id);
        $basic = PricingPlan::where('type', PlanType::FREE->value)->first();

        $user = User::where('stripe_id', $subscription->customer)->first();
        $user->pricing_plan_id = $basic->id;
        $user->stripe_subscription_id = null;
        $user->save();

        $subscription->delete();
    }

    public function userSubscription()
    {
        // Retrieve subscriptions for the user
        $subscriptions = Subscription::all(['customer' => app('user')->stripe_id]);

        // Return the first subscription or null if none exist
        return !empty($subscriptions->data) ? $subscriptions->data[0] : null;
    }
}
