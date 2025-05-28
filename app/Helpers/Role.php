<?php

namespace App\Helpers;

use App\Enums\UserType;

class Role
{

    public static function isAdmin(): bool
    {
        return auth()->user()->role === UserType::ADMIN->value ?? false;
    }
}
