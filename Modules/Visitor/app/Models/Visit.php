<?php

namespace Modules\Visitor\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Modules\Visitor\Database\Factories\VisitFactory;

class Visit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'count',
        'link_id',
    ];

    // protected static function newFactory(): VisitFactory
    // {
    //     // return VisitFactory::new();
    // }

    public function visit_track()
    {
        return $this->hasMany(VisitTrack::class);
    }
}
