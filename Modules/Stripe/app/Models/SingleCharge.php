<?php

namespace Modules\Stripe\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Stripe\Database\factories\SingleChargeFactory;

class SingleCharge extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [];

    protected static function newFactory(): SingleChargeFactory
    {
        //return SingleChargeFactory::new();
    }
}
