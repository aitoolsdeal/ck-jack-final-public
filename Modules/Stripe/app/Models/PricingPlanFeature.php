<?php

namespace Modules\Stripe\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPlanFeature extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'biolinks',
        'biolink_blocks',
        'shortlinks',
        'projects',
        'qrcodes',
        'themes',
        'custom_theme',
        'support',
        'pricing_plan_id',
    ];
}
