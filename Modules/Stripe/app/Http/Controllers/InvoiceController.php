<?php

namespace Modules\Stripe\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Stripe\Services\InvoiceService;

class InvoiceController extends Controller
{
    protected InvoiceService $invoiceService;

    public function __construct()
    {
        $this->invoiceService = new InvoiceService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        [$invoices, $firstPage] = $this->invoiceService->invoices($request->all());

        return Inertia::render('Dashboard/Stripe/Invoices/Index', compact('invoices', 'firstPage'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('stripe::create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        //
        return back();
    }

    /**
     * Show the specified resource.
     */
    public function show($id)
    {
        return view('stripe::show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        return view('stripe::edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): RedirectResponse
    {
        //
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
    }
}
