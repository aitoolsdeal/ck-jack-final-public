<?php

namespace Modules\Stripe\Services;

use App\Enums\PlanType;
use App\Helpers\Role;
use Stripe\StripeClient;

class ChargeService
{
    public function charges(array $params = [])
    {
        $firstPage = false;
        $stripe = new StripeClient(config('stripe.stripe_secret'));

        if (array_key_exists('ending_before', $params)) {
            $latest = $stripe->charges->all(['limit' => 1])->data[0];

            if ($params['ending_before'] === $latest->id) {
                $firstPage = true;
            } else {
                $firstPage = false;
            }
        }

        $filteredParams = $firstPage ? [] : $params;

        if (Role::isAdmin()) {
            $charges = $stripe->charges->all(['limit' => 10, ...$filteredParams]);

            return [$charges, $firstPage];
        } else {
            if (app('user')->pricing_plan->type == PlanType::FREE->value) {
                $charges = [];

            } else {
                $customer = app('user')->stripe_id;

                $charges = $stripe->charges->all(['limit' => 10, 'customer' => $customer, ...$filteredParams]);
            }

            return [$charges, $firstPage];
        }
    }
}
