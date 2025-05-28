<?php

namespace Modules\Stripe\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePricingPlanFeatureRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'biolinks' => 'integer|nullable',
            'biolink_blocks' => 'required|integer|min:0',
            'shortlinks' => 'integer|nullable',
            'projects' => 'integer|nullable',
            'qrcodes' => 'integer|nullable',
            'themes' => 'required|string',
            'custom_theme' => 'required|boolean',
            'support' => 'required|integer|min:0',
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
