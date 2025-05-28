<?php

namespace Modules\Stripe\Services;

use App\Enums\PlanType;
use App\Helpers\Role;
use Stripe\Invoice;
use Stripe\Stripe;

class InvoiceService
{
    public function invoices(array $params)
    {
        $firstPage = false;
        Stripe::setApiKey(config('stripe.stripe_secret'));

        if (array_key_exists('ending_before', $params)) {
            $latest = Invoice::all(['limit' => 1])->data[0];

            if ($params['ending_before'] === $latest->id) {
                $firstPage = true;
            } else {
                $firstPage = false;
            }
        }

        $filteredParams = $firstPage ? [] : $params;

        if (Role::isAdmin()) {
            $invoices = Invoice::all(['limit' => 10, ...$filteredParams]);

            return [$invoices, $firstPage];
        } else {
            if (app('user')->pricing_plan->type == PlanType::FREE->value) {
                $invoices = [];

            } else {
                $customer = app('user')->stripe_id;

                $invoices = Invoice::all(['limit' => 10, 'customer' => $customer, ...$filteredParams]);
            }

            return [$invoices, $firstPage];
        }
    }
}
