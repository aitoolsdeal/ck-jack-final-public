<?php

namespace Modules\Visitor\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Modules\Visitor\Database\Factories\VisitInfoFactory;

class VisitInfo extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'key',
        'value',
        'count',
        'visit_track_id',
    ];

    // protected static function newFactory(): VisitInfoFactory
    // {
    //     // return VisitInfoFactory::new();
    // }

}
