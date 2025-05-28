<?php

namespace Modules\Stripe\Enums;

enum SubscriptionStatus: string {
    case ACTIVE = 'active';
    case CANCELED = 'canceled';

    public function getLabel(): string
    {
        return match ($this) {
            self::ACTIVE => 'Active',
            self::CANCELED => 'Canceled',
        };
    }
}
