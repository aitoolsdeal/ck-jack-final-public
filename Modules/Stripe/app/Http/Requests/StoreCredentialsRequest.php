<?php

namespace Modules\Stripe\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCredentialsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'stripe_key' => 'required|string',
            'stripe_secret' => 'required|string',
            'stripe_webhook_secret' => 'required|string',
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
