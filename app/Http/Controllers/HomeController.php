<?php

namespace App\Http\Controllers;

use App\Helpers\Role;
use App\Http\Requests\UpdateHomeSectionRequest;
use App\Services\IntroPageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Modules\Stripe\Services\PricingPlanService;

class HomeController extends Controller
{
    protected IntroPageService $introService;
    protected PricingPlanService $pricingService;

    public function __construct()
    {
        $this->introService = new IntroPageService();
        $this->pricingService = new PricingPlanService();
    }

    public function index(Request $request)
    {
        $customize = false;
        $introInfo = $this->introService->getIntroInfo();
        $pricingPlans = $this->pricingService->pricingPlans();

        if (app('user')) {
            if (Role::isAdmin() && $request->customize) {
                $customize = true;
            } else {
                $customize = false;
            }
        };

        return Inertia::render('Intro/Index', [
             ...$introInfo,
            'customize' => $customize,
            'pricingPlans' => $pricingPlans,
        ]);
    }

    //-------------------------------------------------
    // Section edit or update of home page
    public function section(UpdateHomeSectionRequest $request, $id)
    {
        $this->introService->updateAppSection($id, $request->validated());

        return back();
    }
    //-------------------------------------------------

    //-------------------------------------------------
    // Section edit or update of home page
    public function sectionList(Request $request, $id)
    {
        $this->introService->updateSectionList($id, $request->all());

        return back();
    }
    //-------------------------------------------------

    //-------------------------------------------------
    // Section edit or update of home page
    public function migrate()
    {
        Artisan::call('migrate --force');

        return back();
    }
    //-------------------------------------------------
}
