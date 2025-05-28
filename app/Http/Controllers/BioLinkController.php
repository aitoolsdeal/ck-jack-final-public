<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Requests\StoreBioLinkRequest;
use App\Http\Requests\UpdateBioLinkRequest;
use App\Models\Link;
use App\Services\BioLinkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response as RequestResponse;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class BioLinkController extends Controller
{
    protected BioLinkService $bioLinkService;

    public function __construct()
    {
        $this->bioLinkService = new BioLinkService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        // dd(app('setting'));
        $links = $this->bioLinkService->getLinksByType($request->all(), 'biolink');
        [$limit, $message] = Utils::featureLimit('biolinks', $links->total());

        return Inertia::render('Dashboard/BioLinks/Index', compact('links', 'limit', 'message'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBioLinkRequest $request)
    {
        $links = Link::where('user_id', app('user')->id)->where('link_type', 'biolink')->count();
        [$limit, $message] = Utils::featureLimit('biolinks', $links);

        if (!$limit) {
            return back()->with("error", $message);
        }

        $this->bioLinkService->create($request->validated());

        return back()->with('success', 'Link created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBioLinkRequest $request, string $id)
    {
        $this->bioLinkService->update($id, $request->validated());

        return back()->with('success', 'Bio Link updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->bioLinkService->deleteLink($id);

        return back()->with('success', 'Link deleted successfully');
    }

    /**
     * Export biolinks list
     */
    public function export()
    {
        $biolinks = Link::where('link_type', 'biolink')->get();
        $columns = Schema::getColumnListing((new Link())->getTable());
        $headers = Utils::exportToCSV($biolinks, $columns, 'biolinks');

        return RequestResponse::make('', 200, $headers);
    }
}
