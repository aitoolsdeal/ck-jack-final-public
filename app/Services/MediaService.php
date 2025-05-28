<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class MediaService
{
    public function getMediaByName(Model $model, string $name): string | null
    {
        $media = $model->getMedia('*', ['name' => $name])->first();

        return $media ? $media->getFullUrl() : null;
    }

    public function addNewDeletePrev(Model $model, $image, string $name = null): string
    {
        if ($name) {
            $prevMedia = $model->getMedia('*', ['name' => $name])->first();
            if ($prevMedia) {
                $prevMedia->delete();
            }

            $newMedia = $model
                ->addMedia($image)
                ->withCustomProperties(['name' => $name])
                ->toMediaCollection();

        } else {
            if ($model->hasMedia()) {
                $model->getMedia()->first()->delete();
            }

            $newMedia = $model
                ->addMedia($image)
                ->toMediaCollection();
        }

        // Return the URL of the newly uploaded media
        return $newMedia->getFullUrl();
    }

    public function addSingleFile(Model $model, $image, string $collectionName = null)
    {
        if ($collectionName) {
            $model->addMedia($image)->toMediaCollection($collectionName);
        } else {
            $model->addMedia($image)->toMediaCollection();
        }
    }
}
