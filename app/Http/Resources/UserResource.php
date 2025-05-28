<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        $media = $this->getMedia('*', ['name' => 'profile'])->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => $media ? $media->getFullUrl() : null,
            'email_verified_at' => $this->email_verified_at,
            'password' => $this->password,
            'status' => $this->status,
            'google_id' => $this->google_id,
            'role' => $this->role,
            'pricing_plan_id' => $this->pricing_plan_id,
            'pricing_plan' => $this->pricing_plan,
            'stripe_id' => $this->stripe_id,
            'stripe_subscription_id' => $this->stripe_subscription_id,
            'pm_type' => $this->pm_type,
            'pm_last_four' => $this->pm_last_four,
            'trial_ends_at' => $this->trial_ends_at,
            'created_at' => $this->created_at,
        ];
    }
}
