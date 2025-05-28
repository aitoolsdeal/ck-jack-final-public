<?php

namespace Modules\Stripe\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Stripe\Models\PricingPlan;
use Modules\Stripe\Services\ChargeService;

class SingleChargeController extends Controller
{
    protected ChargeService $chargeService;

    public function __construct()
    {
        $this->chargeService = new ChargeService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        [$charges, $firstPage] = $this->chargeService->charges($request->all());

        return Inertia::render('Dashboard/Stripe/Charges/Index', compact('charges', 'firstPage'));
    }

    /**
     * Show the specified resource.
     */
    public function checkout(Request $request, $id)
    {
        $plan = PricingPlan::find($id);

        return $request->user()
            ->allowPromotionCodes()
            ->checkout([$plan->stripe_product_price_id => 1], [
                'success_url' => route('stripe-checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('stripe-checkout.cancel'),
                'metadata' => ['pricing_plan_id' => $plan->id],
            ]);
    }
}
