<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('link_name')->nullable();
            $table->text('short_bio')->nullable();
            $table->string('link_type')->default('biolink');
            $table->string('url_name');
            $table->string('social_color')->nullable();
            $table->text('external_url')->nullable();
            $table->text('socials')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('branding')->nullable();
            $table->boolean('custom_theme_active')->default(false);
            $table->foreignId('visit_id')->nullable();
            $table->foreignId('qrcode_id')->nullable();
            $table->foreignId('theme_id')->nullable();
            $table->foreignId('custom_theme_id')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('links');
    }
};
