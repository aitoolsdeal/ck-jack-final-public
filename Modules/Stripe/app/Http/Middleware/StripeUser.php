<?php

namespace Modules\Stripe\Http\Middleware;

use App\Enums\PlanType;
use Closure;
use Illuminate\Http\Request;

class StripeUser
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (app('user')->pricing_plan->type == PlanType::FREE->value) {
            # code...
        } else {
            # code...
        }

        return $next($request);
    }
}
