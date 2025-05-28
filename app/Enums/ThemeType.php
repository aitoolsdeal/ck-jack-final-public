<?php

namespace App\Enums;

enum ThemeType: string {
    case BASIC = 'BASIC';
    case STANDARD = 'STANDARD';
    case PREMIUM = 'PREMIUM';

    public function getLabel(): string
    {
        return match ($this) {
            self::BASIC => 'BASIC',
            self::STANDARD => 'STANDARD',
            self::PREMIUM => 'PREMIUM',
        };
    }
}
