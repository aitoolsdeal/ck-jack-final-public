<?php

namespace Modules\Stripe\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Modules\Stripe\Http\Requests\StorePricingPlanFeatureRequest;
use Modules\Stripe\Http\Requests\UpdatePricingPlanFeatureRequest;
use Modules\Stripe\Models\PricingPlanFeature;
use Modules\Stripe\Services\PricingPlanFeatureService;

class PricingPlanFeatureController extends Controller
{
    protected PricingPlanFeatureService $pricingFeatureService;

    public function __construct()
    {
        $this->pricingFeatureService = new PricingPlanFeatureService();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(string $pricing_plan)
    {
        return Inertia::render('Dashboard/Stripe/Pricing/Feature', compact('pricing_plan'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePricingPlanFeatureRequest $request): RedirectResponse
    {
        $this->pricingFeatureService->create($request->validated());

        return redirect(route('pricing-plans.index'))->with('success', "A new pricing feature added");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $feature = PricingPlanFeature::find($id);

        return Inertia::render('Dashboard/Stripe/Pricing/Feature', compact('feature'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePricingPlanFeatureRequest $request, $id): RedirectResponse
    {
        $this->pricingFeatureService->update($id, $request->validated());

        return redirect(route('pricing-plans.index'))->with('success', "An existing pricing feature updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->pricingFeatureService->delete($id);

        return redirect(route('pricing-plans.index'))->with('success', "An existing pricing feature deleted");
    }
}
