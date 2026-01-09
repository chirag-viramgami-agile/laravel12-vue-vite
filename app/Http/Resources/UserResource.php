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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at,

            $this->mergeWhen($this->roles->isNotEmpty(), [
                'roles' => $this->roles->pluck('name'),
            ]),

            $this->mergeWhen($this->relationLoaded('permissions') || $this->permissions->isNotEmpty(), [
                'permissions' => $this->getAllPermissions()->pluck('name'),
            ]),
            
            /* // Only shows if $user->load('roles') was called
            'roles' => $this->whenLoaded('roles', function () {
                return $this->roles->pluck('name');
            }),

            // For Spatie permissions, we usually check if the relation exists
            'permissions' => $this->whenLoaded('permissions', function () {
                return $this->getAllPermissions()->pluck('name');
            }), */
        ];
        return parent::toArray($request);
    }
}
