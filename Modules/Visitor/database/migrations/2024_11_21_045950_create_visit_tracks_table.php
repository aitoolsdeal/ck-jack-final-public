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
        Schema::create('visit_tracks', function (Blueprint $table) {
            $table->id();
            $table->integer('01am')->default(0);
            $table->integer('02am')->default(0);
            $table->integer('03am')->default(0);
            $table->integer('04am')->default(0);
            $table->integer('05am')->default(0);
            $table->integer('06am')->default(0);
            $table->integer('07am')->default(0);
            $table->integer('08am')->default(0);
            $table->integer('09am')->default(0);
            $table->integer('10am')->default(0);
            $table->integer('11am')->default(0);
            $table->integer('12am')->default(0);

            $table->integer('01pm')->default(0);
            $table->integer('02pm')->default(0);
            $table->integer('03pm')->default(0);
            $table->integer('04pm')->default(0);
            $table->integer('05pm')->default(0);
            $table->integer('06pm')->default(0);
            $table->integer('07pm')->default(0);
            $table->integer('08pm')->default(0);
            $table->integer('09pm')->default(0);
            $table->integer('10pm')->default(0);
            $table->integer('11pm')->default(0);
            $table->integer('12pm')->default(0);
            $table->integer('total');
            $table->foreignId('visit_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visit_tracks');
    }
};
