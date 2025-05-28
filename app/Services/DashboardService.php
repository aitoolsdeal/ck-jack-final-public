<?php

namespace App\Services;

use App\Helpers\Role;
use App\Models\Link;
use App\Models\Project;
use App\Models\QRCode;
use Illuminate\Support\Carbon;

class DashboardService
{
    public function getDashboardsInfo(array $data)
    {
        $selectedYear = $data['year']; // Default to "all"
        $selectedMonth = $data['month']; // Month is required

        if (!$selectedMonth || $selectedMonth < 1 || $selectedMonth > 12) {
            return response()->json(['error' => 'Invalid month selected.'], 400);
        }

        $isAllYears = $selectedYear === 'all';

        // Get the number of days in the selected month
        $daysInMonth = Carbon::create(2000, $selectedMonth)->daysInMonth;

        // Prepare an empty days collection for the selected month
        $emptyDays = collect(range(1, $daysInMonth))->mapWithKeys(function ($day) use ($selectedMonth, $selectedYear, $isAllYears) {
            $date = Carbon::create($isAllYears ? 2000 : $selectedYear, $selectedMonth, $day);
            return [
                $day => [
                    'total' => 0,
                    'day' => $date->format('D'), // Short name of the day
                ],
            ];
        });

        // Query function for each table
        $fetchData = function ($model, $filter = null) use ($isAllYears, $selectedYear, $selectedMonth) {
            return $model::query()
                ->when(!Role::isAdmin(), function ($query) {
                    return $query->where('user_id', app('user')->id);
                })
                ->when($filter, fn($query) => $query->where('link_type', $filter))
                ->selectRaw('DAY(created_at) as day, COUNT(*) as total')
                ->when(!$isAllYears, fn($query) => $query->whereYear('created_at', $selectedYear))
                ->whereMonth('created_at', $selectedMonth)
                ->groupBy('day')
                ->orderBy('day')
                ->get();
        };

        // Fetch data for links, projects, and QR codes
        $bioLinksQuery = $fetchData(Link::class, 'biolink');
        $shortLinksQuery = $fetchData(Link::class, 'shortlink');
        $projectsQuery = $fetchData(Project::class);
        $qrCodesQuery = $fetchData(QrCode::class);

        // Format data
        $bioLinksData = $this->formatData($bioLinksQuery, $emptyDays);
        $shortLinksData = $this->formatData($shortLinksQuery, $emptyDays);
        $projectsData = $this->formatData($projectsQuery, $emptyDays);
        $qrCodesData = $this->formatData($qrCodesQuery, $emptyDays);

        // Calculate totals
        $bioLinksTotal = $bioLinksQuery->sum('total');
        $shortLinksTotal = $shortLinksQuery->sum('total');
        $projectsTotal = $projectsQuery->sum('total');
        $qrCodesTotal = $qrCodesQuery->sum('total');

        return [
            'bioLinksData' => $bioLinksData,
            'shortLinksData' => $shortLinksData,
            'projectsData' => $projectsData,
            'qrCodesData' => $qrCodesData,
            'bioLinksTotal' => $bioLinksTotal,
            'shortLinksTotal' => $shortLinksTotal,
            'projectsTotal' => $projectsTotal,
            'qrCodesTotal' => $qrCodesTotal,
        ];
    }

    private function formatData($queryResult, $emptyDays)
    {
        // Merge query result and empty days
        $data = $queryResult->mapWithKeys(function ($item) {
            return [
                $item->day => [
                    'total' => $item->total,
                    'day' => Carbon::createFromDate(2000, request('month'), $item->day)->format('D'), // Correct usage
                ],
            ];
        });

        // Ensure empty days also have day
        $emptyDaysWithNames = $emptyDays->map(function ($item, $day) {
            $item['day'] = Carbon::createFromDate(2000, request('month'), $day)->format('D');
            return $item;
        });

        // Merge and sort by day
        return $data->union($emptyDaysWithNames)->sortKeys();
    }
}
