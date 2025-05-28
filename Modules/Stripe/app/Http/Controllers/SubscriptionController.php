<?php

namespace Modules\Stripe\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Stripe\Models\PricingPlan;
use Modules\Stripe\Services\SubscriptionService;

class SubscriptionController extends Controller
{
    protected SubscriptionService $subscriptionService;

    public function __construct()
    {
        $this->subscriptionService = new SubscriptionService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscriptions = $this->subscriptionService->subscriptions();

        return Inertia::render('Dashboard/Stripe/Subscriptions/Index', compact('subscriptions'));
    }

    /**
     * Cancel the status of the subscription.
     */
    public function status(Request $request)
    {
        $this->subscriptionService->statusHandler($request->id, $request->cancel_at_period_end);

        return back()->with('success', "Subscription status have changed.");
    }

    /**
     * Cancel the status of the subscription.
     */
    public function cancel(Request $request)
    {
        $this->subscriptionService->cancelNow($request->id);

        return back()->with('success', "Your subscription plan have been cancelled");
    }

    /**
     * Show the specified resource.
     */
    public function checkout(Request $request, $id)
    {
        $plan = PricingPlan::find($id);

        return $request->user()
            ->newSubscription('default', $plan->stripe_product_price_id)
            ->allowPromotionCodes()
            ->checkout([
                'success_url' => route('stripe-checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('stripe-checkout.cancel'),
                'metadata' => ['pricing_plan_id' => $plan->id],
            ]);
    }

    /**
     * Cancel the status of the subscription.
     */
    public function basic(Request $request)
    {
        $this->subscriptionService->cancelNow($request->id);

        return back()->with('success', "Your subscription plan have been cancelled");
    }
}
