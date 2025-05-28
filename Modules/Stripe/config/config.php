<?php

return [
    'stripe_key' => env('STRIPE_KEY'),
    'stripe_secret' => env('STRIPE_SECRET'),
    'stripe_webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),

    'cashier_currency' => env('CASHIER_CURRENCY'),
    'cashier_currency_local' => env('CASHIER_CURRENCY_LOCALE'),
];
