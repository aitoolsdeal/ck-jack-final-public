<?php

namespace Modules\Visitor\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Modules\Visitor\Database\Factories\VisitTrackFactory;

class VisitTrack extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        '01am',
        '02am',
        '03am',
        '04am',
        '05am',
        '06am',
        '07am',
        '08am',
        '09am',
        '10am',
        '11am',
        '12am',
        '01pm',
        '02pm',
        '03pm',
        '04pm',
        '05pm',
        '06pm',
        '07pm',
        '08pm',
        '09pm',
        '10pm',
        '11pm',
        '12pm',
        'total',
        'visit_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
    // protected static function newFactory(): VisitTrackFactory
    // {
    //     // return VisitTrackFactory::new();
    // }

    public function visit_info()
    {
        return $this->hasMany(VisitInfo::class);
    }
}
