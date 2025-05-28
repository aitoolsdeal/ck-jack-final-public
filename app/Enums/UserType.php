<?php

namespace App\Enums;

enum UserType: string {
    case USER = 'user';
    case ADMIN = 'admin';

    public function getLabel(): string
    {
        return match ($this) {
            self::USER => 'User',
            self::ADMIN => 'Admin',
        };
    }
}
