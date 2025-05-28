<?php

namespace App\Http\Controllers;

use App\Helpers\Utils;
use App\Http\Requests\StoreShortLinkRequest;
use App\Http\Requests\UpdateShortLinkRequest;
use App\Models\Link;
use App\Services\ShortLinkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response as RequestResponse;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class ShortLinkController extends Controller
{
    protected ShortLinkService $shortLinkService;

    public function __construct()
    {
        $this->shortLinkService = new ShortLinkService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $links = $this->shortLinkService->getLinksByType($request->all(), 'shortlink');
        [$limit, $message] = Utils::featureLimit('shortlinks', $links->total());

        return Inertia::render('Dashboard/ShortLinks/Index', compact('links', 'limit', 'message'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShortLinkRequest $request)
    {
        $links = $this->shortLinkService->getLinksByType([], 'shortlink');
        [$limit, $message] = Utils::featureLimit('shortlinks', $links->total());

        if (!$limit) {
            return back()->with("error", $message);
        }

        $this->shortLinkService->create($request->validated());

        return back()->with('success', 'Short Link created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShortLinkRequest $request, string $id)
    {
        $this->shortLinkService->update($id, $request->validated());

        return back()->with('success', 'Short Link updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->shortLinkService->deleteLink($id);

        return back()->with('success', 'Short link deleted successfully');
    }

    /**
     * Export shortlink list
     */
    public function export()
    {
        $shortlink = Link::where('link_type', 'shortlink')->get();
        $columns = Schema::getColumnListing((new Link())->getTable());
        $headers = Utils::exportToCSV($shortlink, $columns, 'shortlinks');

        return RequestResponse::make('', 200, $headers);
    }
}
