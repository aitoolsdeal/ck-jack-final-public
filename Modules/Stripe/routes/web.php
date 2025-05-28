<?php

use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Middleware\InstalledRoutes;
use Modules\Stripe\Http\Controllers\InvoiceController;
use Modules\Stripe\Http\Controllers\PricingPlanController;
use Modules\Stripe\Http\Controllers\PricingPlanFeatureController;
use Modules\Stripe\Http\Controllers\SingleChargeController;
use Modules\Stripe\Http\Controllers\StripeController;
use Modules\Stripe\Http\Controllers\SubscriptionController;
use Modules\Stripe\Http\Middleware\StripeCredentials;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::middleware('auth', 'verified', InstalledRoutes::class)->prefix('dashboard/stripe')->group(function () {
    Route::post('credentials', [StripeController::class, 'credentials'])->name('stripe.credentials');

    Route::middleware(StripeCredentials::class)->group(function () {
        Route::post('checkout/webhook', [StripeController::class, 'webhook'])->name('stripe-checkout.webhook');

        Route::get('checkout/success', [StripeController::class, 'success'])->name('stripe-checkout.success');
        Route::get('checkout/cancel', [StripeController::class, 'cancel'])->name('stripe-checkout.cancel');

        Route::resource('pricing-plans', PricingPlanController::class)->only(['index']);
        Route::middleware('admin')->group(function () {
            Route::resource('pricing-plans', PricingPlanController::class)->except(['index']);
            Route::resource('pricing-feature', PricingPlanFeatureController::class)->only(['store', 'edit', 'update', 'destroy']);
            Route::get('pricing-feature/{pricing_plan}', [PricingPlanFeatureController::class, 'create'])->name('pricing-feature.create');
        });

        Route::prefix('subscription')->group(function () {
            Route::get('show', [SubscriptionController::class, 'index'])->name('subscription.index');
            Route::post('status', [SubscriptionController::class, 'status'])->name('subscription.status');
            Route::post('status/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.status.cancel');
            Route::get('checkout/{id}', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
        });

        Route::prefix('single-charge')->group(function () {
            Route::get('show', [SingleChargeController::class, 'index'])->name('single-charge.index');
            Route::get('checkout/{id}', [SingleChargeController::class, 'checkout'])->name('single-charge.checkout');
        });

        Route::resource('invoices', InvoiceController::class)->only(['index']);
    });
});
