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
        Schema::table('shoppinglists', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->after('name');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
        Schema::table('shoppinglists_details', function (Blueprint $table) {
            $table->dropColumn('user_id');
            $table->foreign('list_id')->references('id')->on('shoppinglists')->onDelete('cascade');;

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};