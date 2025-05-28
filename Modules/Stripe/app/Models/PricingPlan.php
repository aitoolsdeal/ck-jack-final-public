<?php

namespace Modules\Stripe\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'active',
        'type',
        'title',
        'description',
        'stripe_product_id',
        'stripe_product_price_id',
        'pricing_feature_id',
    ];

    public function pricing_features()
    {
        return $this->belongsTo(PricingPlanFeature::class, 'pricing_feature_id');
    }
}
