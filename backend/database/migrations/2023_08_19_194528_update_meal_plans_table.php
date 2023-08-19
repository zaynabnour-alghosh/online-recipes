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
        Schema::table('meal_plans', function (Blueprint $table) {
            $table->dropForeign(['meal_type_id']);
            $table->dropColumn('meal_type_id');
            $table->enum('type', ['breakfast', 'lunch', 'dinner', 'snack']);
        });
        Schema::dropIfExists('meal_types');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
