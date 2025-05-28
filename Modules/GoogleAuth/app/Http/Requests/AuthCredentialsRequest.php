<?php

namespace Modules\GoogleAuth\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthCredentialsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'google_client_id' => 'required|string',
            'google_client_secret' => 'required|string',
            'google_redirect_uri' => 'required|string',
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
