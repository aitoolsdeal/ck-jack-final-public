<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAppInfoRequest extends FormRequest
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
            'name' => 'required|string|max:50',
            'title' => 'required|string|max:50',
            'logo' => 'nullable|image|mimes:png|max:1024',
            'copyright' => 'required|string|max:100',
            'description' => 'required|string|max:200',
            'banner' => 'nullable|image|mimes:jpg,png|max:2048',
        ];
    }
}
