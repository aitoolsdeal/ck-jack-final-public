<?php

namespace App\Http\Requests;

use App\Rules\CheckLinkName;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreShortLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'link_name' => ['required', 'string', 'min:5', 'max:255'],
            'external_url' => ['required', 'min:10', 'max:255', 'url'],
            'link_slug' => ['nullable', 'string', 'min:6', 'max:50', 'unique:links,url_name', new CheckLinkName],
        ];
    }
}
