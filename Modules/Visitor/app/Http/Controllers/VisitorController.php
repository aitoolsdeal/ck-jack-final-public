<?php

namespace Modules\Visitor\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Services\LinkService;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Jenssegers\Agent\Agent;
use Modules\Visitor\Services\VisitService;
use Stevebauman\Location\Facades\Location;

class VisitorController extends Controller
{
    protected LinkService $linkService;
    protected VisitService $visitService;
    protected MediaService $mediaService;

    public function __construct()
    {
        $this->linkService = new LinkService();
        $this->visitService = new VisitService();
        $this->mediaService = new MediaService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $linkName)
    {
        $link = Link::where('url_name', $linkName)->first();

        if ($link) {
            $visit = $this->visitService->visits($link);

            $agent = new Agent();
            // 37.111.206.77
            // 118.179.190.250
            $position = Location::get('37.111.206.77');
            // $position = Location::get(request()->ip());

            $referer_url = request()->headers->get('referer');
            $referer = parse_url($referer_url, PHP_URL_HOST);

            $track = $this->visitService->visit_track($visit, $position->timezone);

            $this->visitService->visit_info($track->id, 'country', $position->countryName ?? 'Unknown');
            $this->visitService->visit_info($track->id, 'city', $position->cityName ?? 'Unknown');
            $this->visitService->visit_info($track->id, 'timezone', $position->timezone ?? 'Unknown');
            $this->visitService->visit_info($track->id, 'device', $agent->device());
            $this->visitService->visit_info($track->id, 'browser', $agent->browser());
            $this->visitService->visit_info($track->id, 'os', $agent->platform());
            $this->visitService->visit_info($track->id, 'phone', $agent->isPhone());
            $this->visitService->visit_info($track->id, 'desktop', $agent->isDesktop());
            $this->visitService->visit_info($track->id, 'referer', $referer ?? 'None');
            $this->visitService->visit_info($track->id, 'referer_url', $referer_url ?? 'None');

            if ($link->link_type == 'shortlink') {
                return redirect()->to(url($link->external_url));
            } else {
                $link->load(['theme', 'custom_theme', 'items']);

                if ($link) {
                    $link->thumbnail = $this->mediaService->getMediaByName($link, 'thumbnail');
                    $link->branding = $this->mediaService->getMediaByName($link, 'branding');

                    $link->items->each(function ($item) {
                        if ($item->hasMedia()) {
                            $item->content = $item->getFirstMediaUrl();
                        }
                    });
                }

                return Inertia::render('Dashboard/BioLinks/Show', compact('link'));
            }
        } else {
            abort(404);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('visitor::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('visitor::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('visitor::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }

    /**
     * Bio-link or Short-link analytics for tracking users
     */
    public function analytics(Request $request, $id)
    {
        try {
            $date = $request->date;
            $link = $this->visitService->analytics($request->all(), $id);

            return Inertia::render('Dashboard/LinkAnalytics/Index', compact('link', 'date'));
        } catch (\Throwable $th) {
            return back()->with("error", $th->getMessage());
        }
    }
}
