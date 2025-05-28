<?php

namespace Modules\Stripe\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;
use Modules\Stripe\Http\Requests\StoreCredentialsRequest;
use Modules\Stripe\Services\SubscriptionService;
use Stripe\Invoice;
use Stripe\PaymentIntent;
use Stripe\PaymentMethod;
use Stripe\Stripe;

class StripeController extends Controller
{
    protected SubscriptionService $subscriptionService;

    public function __construct()
    {
        $this->subscriptionService = new SubscriptionService();
    }

    public function credentials(StoreCredentialsRequest $request)
    {
        // Validate the Stripe credentials
        try {
            Stripe::setApiKey($request->stripe_secret);

            \Stripe\Balance::retrieve();
        } catch (Exception $e) {
            return back()->with('error', 'Invalid Stripe credentials: ' . $e->getMessage());
        }

        try {
            Artisan::call('down'); // Maintenance mode ON

            Utils::changeEnv([
                'STRIPE_KEY' => '"' . $request->stripe_key . '"',
                'STRIPE_SECRET' => '"' . $request->stripe_secret . '"',
                'STRIPE_WEBHOOK_SECRET' => '"' . $request->stripe_webhook_secret . '"',
            ]);

            Artisan::call('up');

            return back()->with('success', 'Stripe credentials have been updated.');
        } catch (\Exception $e) {
            Artisan::call('up');

            return back()->with('error', 'Error: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function success(Request $request)
    {
        $subscribed = app('user')->stripe_subscription_id;
        if ($subscribed) {
            $this->subscriptionService->cancelNow($subscribed);
        }

        Stripe::setApiKey(config('stripe.stripe_secret'));

        $sessionId = $request->query('session_id');

        if ($sessionId === null) {
            return redirect()->route('stripe-checkout.cancel');
        }

        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        if ($session->payment_status !== 'paid') {
            return redirect()->route('stripe-checkout.cancel');
        }

        $planId = $session['metadata']['pricing_plan_id'] ?? null;

        if ($session->mode === 'subscription') {
            $invoice = Invoice::retrieve($session->invoice);
            $paymentIntent = PaymentIntent::retrieve($invoice->payment_intent);
        } else {
            $paymentIntent = PaymentIntent::retrieve($session->payment_intent);
        }

        $paymentMethod = PaymentMethod::retrieve($paymentIntent->payment_method);

        $user = User::find(app('user')->id);
        $user->pricing_plan_id = $planId;
        $user->pm_type = $paymentMethod->type;
        $user->pm_last_four = $paymentMethod->card->last4;
        $user->stripe_subscription_id = $session->subscription ?? null;
        $user->save();

        return Inertia::render('Dashboard/Stripe/Status/Success');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function cancel()
    {
        return Inertia::render('Dashboard/Stripe/Status/Cancel');
    }

    /**
     * Handling webhook event from stripe
     */
    public function webhook()
    {
        // Ensure the key is kept out of any version control system you might be using.
        $stripe = new \Stripe\StripeClient(config('stripe.stripe_secret'));

        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        $endpoint_secret = config('stripe.stripe_webhook_secret');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            http_response_code(400);
            exit();
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            http_response_code(400);
            exit();
        }

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.async_payment_failed':
                $session = $event->data->object;
            case 'checkout.session.async_payment_succeeded':
                $session = $event->data->object;
            case 'checkout.session.completed':
                $session = $event->data->object;
            case 'checkout.session.expired':
                $session = $event->data->object;
                // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        return response('');
    }
}
