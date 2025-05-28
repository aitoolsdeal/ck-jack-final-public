<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Modules\Visitor\Models\Visit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Link extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'link_name',
        'short_bio',
        'link_type',
        'url_name',
        'social_color',
        'external_url',
        'socials',
        'thumbnail',
        'branding',
        'custom_theme_active',
        'visit_id',
        'qrcode_id',
        'theme_id',
        'custom_theme_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function qrcode()
    {
        return $this->belongsTo(QRCode::class);
    }

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }

    public function custom_theme()
    {
        return $this->belongsTo(CustomTheme::class);
    }

    public function items()
    {
        return $this->hasMany(LinkItem::class)->orderBy('item_position', 'asc');
    }

    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }

    // public function visited()
    // {
    //     return $this->hasMany(ShetabitVisit::class);
    // }

    // public function visit()
    // {
    //     return visits($this);
    // }

    // public function visits()
    // {
    //     return visits($this)->relation();
    // }
}
