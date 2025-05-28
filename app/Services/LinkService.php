<?php

namespace App\Services;

use App\Helpers\Role;
use App\Helpers\Utils;
use App\Models\Link;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class LinkService extends MediaService
{
    public function getLinkById(string | int $id): Link | null
    {
        $user = app('user');
        $SA = Role::isAdmin();

        $link = Link::when(!$SA, function ($query) use ($user) {
            return $query->where('user_id', $user->id);
        })
            ->where('id', $id)
            ->with(['theme', 'custom_theme', 'items'])
            ->first();

        if ($link) {
            $link->thumbnail = $this->getMediaByName($link, 'thumbnail');
            $link->branding = $this->getMediaByName($link, 'branding');

            $link->items->each(function ($item) {
                if ($item->hasMedia()) {
                    $item->content = $item->getFirstMediaUrl();
                }
            });
        }

        return $link;
    }

    public function getLinkByUrl(string $urlName): Link | null
    {
        $link = Link::where('url_name', $urlName)
            ->with(['theme', 'custom_theme', 'items'])
            ->first();

        if ($link) {
            $link->thumbnail = $this->getMediaByName($link, 'thumbnail');
            $link->branding = $this->getMediaByName($link, 'branding');

            $link->items->each(function ($item) {
                if ($item->hasMedia()) {
                    $item->content = $item->getFirstMediaUrl();
                }
            });
        }

        return $link;
    }

    public function getLinksByType(array $data, string $linkType): LengthAwarePaginator
    {
        $user = app('user');
        $SA = Role::isAdmin();
        $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

        $links = Link::when(!$SA, function ($query) use ($user) {
            return $query->where('user_id', $user->id);
        })
            ->when(array_key_exists('search', $data), function ($query) use ($data) {
                return $query->where('link_name', 'LIKE', '%' . $data['search'] . '%');
            })
            ->where('link_type', $linkType)
            ->orderBy('created_at', 'desc')
            ->with(['qrcode', 'visit'])
            ->paginate($page);

        return $links;
    }

    public function exportLinksByType(string $linkType)
    {
        $biolinks = Link::where('link_type', $linkType)->get();
        $columns = Schema::getColumnListing((new Link())->getTable());
        $headers = Utils::exportToCSV($biolinks, $columns, 'biolinks');

        return $headers;
    }

    public function deleteLink(int | string $id)
    {
        DB::transaction(function () use ($id) {
            Link::find($id)->delete();
        }, 5);
    }
}
