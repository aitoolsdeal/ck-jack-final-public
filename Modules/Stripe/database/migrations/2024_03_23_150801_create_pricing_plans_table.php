<?php

use App\Enums\PlanType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->boolean('active')->default(true);
            $table->string('type')->default(PlanType::PAID->value);
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('stripe_product_id')->nullable();
            $table->string('stripe_product_price_id')->nullable();
            $table->foreignId('pricing_feature_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
