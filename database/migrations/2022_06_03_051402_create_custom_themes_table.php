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
        Schema::create('custom_themes', function (Blueprint $table) {
            $table->id();
            $table->string("name")->default('Custom Theme');
            $table->text("background");
            $table->string("bg_type");
            $table->string('bg_color');
            $table->string('bg_image')->nullable();
            $table->string("text_color");
            $table->string("btn_type");
            $table->boolean("btn_transparent");
            $table->string("btn_radius");
            $table->string("btn_bg_color");
            $table->string("btn_text_color");
            $table->string("font_family");
            $table->foreignId('link_id')->constrained('links', 'id')->onDelete('cascade');
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
        Schema::dropIfExists('custom_themes');
    }
};
