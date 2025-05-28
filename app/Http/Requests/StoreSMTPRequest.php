<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSMTPRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'mail_mailer' => 'required',
            'mail_host' => 'required',
            'mail_port' => 'required',
            'mail_encryption' => 'required',
            'mail_username' => 'required',
            'mail_password' => 'required',
            'mail_address' => 'required|max:50|email',
            'mail_from_name' => 'required',
            'admin_email' => 'required|max:50|email',
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
