<?php

namespace Modules\Stripe\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Stripe\Price;
use Stripe\Product;
use Stripe\Stripe;

class UpdatePricingPlanRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'active' => 'required|boolean',
            'type' => 'required|in:free,paid',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255',
            'stripe_product_id' => ['nullable', 'string', 'max:255', function (string $attribute, mixed $value, Closure $fail) {
                Stripe::setApiKey(config('stripe.stripe_secret'));

                try {
                    Product::retrieve($value);
                } catch (\Throwable $th) {
                    $fail($th->getMessage() . " in the stripe.");
                }
            }],
            'stripe_product_price_id' => ['nullable', 'string', 'max:255', function (string $attribute, mixed $value, Closure $fail) {
                Stripe::setApiKey(config('stripe.stripe_secret'));

                try {
                    Price::retrieve($value);
                } catch (\Throwable $th) {
                    $fail($th->getMessage() . " in the stripe.");
                }
            }],
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
}
