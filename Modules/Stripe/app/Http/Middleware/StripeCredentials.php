<?php

namespace Modules\Stripe\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Stripe\Stripe;

class StripeCredentials
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        $stripeKey = config('stripe.stripe_key');
        $stripeSecret = config('stripe.stripe_secret');
        $stripeWebhookSecret = config('stripe.stripe_webhook_secret');

        // Check if credentials are set
        if (empty($stripeKey) || empty($stripeSecret) || empty($stripeWebhookSecret)) {
            return back()->with('error', 'Stripe credentials are missing');
        }

        // Validate the Stripe credentials
        try {
            Stripe::setApiKey($stripeSecret);

            // Attempt to fetch a resource to validate the API key
            \Stripe\Balance::retrieve();
        } catch (Exception $e) {
            return back()->with('error', 'Invalid Stripe credentials: ' . $e->getMessage());
        }

        return $next($request);
    }
}
