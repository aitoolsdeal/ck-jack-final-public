<?php

namespace App\Services;

use App\Models\CustomPage;
use App\Models\IntroSection;
use App\Models\Testimonial;
use Illuminate\Support\Facades\DB;

class IntroPageService extends MediaService
{
    public function getIntroInfo(): array
    {
        $customPages = CustomPage::all();
        $testimonials = Testimonial::all();

        $appSections = IntroSection::all()->each(function ($item) {
            if ($item->hasMedia()) {
                $item->thumbnail = $item->getFirstMediaUrl();
            }
        });

        return [
            'appSections' => $appSections,
            'customPages' => $customPages,
            'testimonials' => $testimonials,
        ];
    }

    public function updateAppSection(int | string $id, array $data)
    {
        DB::transaction(function () use ($id, $data) {
            $section = IntroSection::find($id);

            $section->update([
                'title' => $data['title'],
                'description' => $data['description'],
            ]);

            if ($data['thumbnail']) {
                $this->addNewDeletePrev($section, $data['thumbnail']);
            };
        }, 5);
    }

    public function updateSectionList(string $id, array $data)
    {
        DB::transaction(function () use ($id, $data) {
            IntroSection::where('id', $id)->update([
                'section_list' => $data['section_list'],
            ]);
        }, 5);
    }
}
