<?php

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
        Schema::create('pricing_plan_features', function (Blueprint $table) {
            $table->id();
            $table->string('biolinks')->nullable();
            $table->integer('biolink_blocks');
            $table->string('shortlinks')->nullable();
            $table->string('projects')->nullable();
            $table->string('qrcodes')->nullable();
            $table->string('themes');
            $table->boolean('custom_theme');
            $table->integer('support');
            $table->foreignId('pricing_plan_id')->constrained('pricing_plans', 'id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plan_features');
    }
};
