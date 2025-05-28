<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct()
    {
        $this->dashboardService = new DashboardService();
    }

    public function index(Request $request)
    {
        $results = $this->dashboardService->getDashboardsInfo(['year' => 'all', 'month' => now()->month]);

        return Inertia::render('Dashboard/Index', [ ...$results, 'months' => now()->month]);
    }

    private function formatData($queryResult, $emptyDays)
    {
        // Merge query result and empty days
        $data = $queryResult->mapWithKeys(function ($item) {
            return [
                $item->day => [
                    'total' => $item->total,
                    'day_name' => Carbon::createFromDate(2000, request('month'), $item->day)->format('D'), // Correct usage
                ],
            ];
        });

        // Ensure empty days also have day_name
        $emptyDaysWithNames = $emptyDays->map(function ($item, $day) {
            $item['day_name'] = Carbon::createFromDate(2000, request('month'), $day)->format('D');
            return $item;
        });

        // Merge and sort by day
        return $data->union($emptyDaysWithNames)->sortKeys();
    }
}
