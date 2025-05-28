<?php

namespace Modules\Visitor\Services;

use App\Models\Link;
use Carbon\Carbon;
use Modules\Visitor\Models\Visit;
use Modules\Visitor\Models\VisitInfo;
use Modules\Visitor\Models\VisitTrack;

class VisitService
{
    public function visits(Link $link): Visit
    {
        $visit = Visit::where('link_id', $link->id)->first();

        if ($visit) {
            $visit->update(['count' => $visit->count + 1]);

            $link->update(['visit_id' => $visit->id]);

            return $visit;
        } else {
            $visit = Visit::create(['count' => 1, 'link_id' => $link->id]);

            $link->update(['visit_id' => $visit->id]);

            return $visit;
        }
    }

    public function visit_track(Visit $visit, string $timezone): VisitTrack
    {
        $today = Carbon::today();

        $track = VisitTrack::whereDate('created_at', $today)
            ->where('visit_id', $visit->id)
            ->first();

        $currentHour = strtolower(str_replace(' ', '', now($timezone)->format('h A')));

        if ($track) {
            $track->update([
                $currentHour => $track[$currentHour] + 1,
                'total' => $track->total + 1,
            ]);

            return $track;
        } else {
            $track = VisitTrack::create([
                $currentHour => 1,
                'total' => 1,
                'visit_id' => $visit->id,
            ]);

            return $track;
        }
    }

    public function visit_info(string $visit_track_id, string $key, string $value)
    {
        $info = VisitInfo::where('visit_track_id', $visit_track_id)
            ->where('key', $key)
            ->where('value', $value)
            ->first();

        if ($info) {
            $info->update([
                'count' => $value ? $info->count + 1 : $info->count,
            ]);
        } else {
            VisitInfo::create([
                'key' => $key,
                'value' => $value,
                'count' => $value ? 1 : 0,
                'visit_track_id' => $visit_track_id,
            ]);
        }
    }

    public function analytics(array $data, string $id): Link
    {
        $link = Link::where('id', $id)
            ->with(['visit' => function ($query) use ($data) {
                $query->with(['visit_track' => function ($query) use ($data) {
                    if (array_key_exists('date', $data)) {
                        switch ($data['date']) {
                            case 'today':
                                $query->whereDate('created_at', Carbon::today());
                                break;

                            case 'this_week':
                                $query->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                                break;

                            case 'last_month':
                                $query->whereMonth('created_at', Carbon::now()->subMonth()->month);
                                break;

                            case 'last_6_months':
                                $query->where('created_at', '>=', Carbon::now()->subMonths(6));
                                break;

                            case 'last_year':
                                $query->whereYear('created_at', Carbon::now()->subYear()->year);
                                break;

                            case 'all_time':
                                // No filtering needed for all-time
                                break;

                            default:
                                // Handle any invalid or unexpected value
                                break;
                        }
                    }
                    $query->with('visit_info');
                }]);
            }])
            ->first();

        return $link;
    }
}
