<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);

        return [
            'id' => $this->id,
            'logo' => $this->logo,
            'title' => $this->title,
            'description' => $this->description,
            'copyright' => $this->copyright,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
