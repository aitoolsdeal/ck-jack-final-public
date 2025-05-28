<?php

namespace Modules\Stripe\Enums;

enum PricingType: string {
    case STANDARD = 'standard';
    case PREMIUM = 'premium';

    public function getLabel(): string
    {
        return match ($this) {
            self::STANDARD => 'Standard',
            self::PREMIUM => 'Premium',
        };
    }
}
