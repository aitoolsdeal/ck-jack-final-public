<?php

namespace Modules\Stripe\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Stripe\Http\Requests\StorePricingPlanRequest;
use Modules\Stripe\Http\Requests\UpdatePricingPlanRequest;
use Modules\Stripe\Models\PricingPlan;
use Modules\Stripe\Services\PricingPlanService;

class PricingPlanController extends Controller
{
    protected PricingPlanService $pricingService;

    public function __construct()
    {
        $this->pricingService = new PricingPlanService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pricingPlans = $this->pricingService->pricingPlans();

        return Inertia::render('Dashboard/Stripe/Pricing/Index', compact('pricingPlans'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/Stripe/Pricing/Setup');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePricingPlanRequest $request): RedirectResponse
    {
        // dd($request->all());
        $this->pricingService->create($request->validated());

        return redirect(route('pricing-plans.index'))->with('success', "A new pricing plan created.");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $pricing = PricingPlan::find($id)->with('pricing_features')->first();

        return Inertia::render('Dashboard/Stripe/Pricing/Setup', compact('pricing'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePricingPlanRequest $request, $id): RedirectResponse
    {
        $this->pricingService->update($id, $request->validated());

        return redirect(route('pricing-plans.index'))->with('success', "An existing pricing plan created.");
    }
}
