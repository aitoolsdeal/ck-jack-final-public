<?php

namespace Modules\Stripe\Services;

use Illuminate\Support\Facades\DB;
use Modules\Stripe\Models\PricingPlan;
use Modules\Stripe\Models\PricingPlanFeature;

class PricingPlanFeatureService
{
    public function create(array $data)
    {
        return DB::transaction(function () use ($data) {
            $feature = PricingPlanFeature::create($data);

            PricingPlan::find($data['pricing_plan_id'])
                ->update(['pricing_feature_id' => $feature->id]);
        }, 5);
    }

    public function update(string $id, array $data)
    {
        return DB::transaction(function () use ($id, $data) {
            PricingPlanFeature::find($id)->update($data);
        }, 5);
    }

    public function delete(string $id)
    {
        return DB::transaction(function () use ($id) {
            PricingPlanFeature::find($id)->delete();
        }, 5);
    }
}
