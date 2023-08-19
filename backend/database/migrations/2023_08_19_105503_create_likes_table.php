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
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');

        });
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_id');
            $table->text('comment_text');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');

        });
        Schema::create('shoppinglists', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });
        Schema::create('shoppinglists_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('list_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_id');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
            $table->foreign('list_id')->references('id')->on('shoppinglists')->onDelete('cascade');

        });
        Schema::create('meal_types', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->timestamps();
        });
        Schema::create('meal_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('recipe_id');
            $table->date('date');
            $table->unsignedBigInteger('meal_type_id');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
            $table->foreign('meal_type_id')->references('id')->on('meal_types')->onDelete('cascade');

        });

        Schema::table('recipes', function (Blueprint $table) {
            $table->integer('nb_likes')->after('cuisine');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
        Schema::table('recipes_ingredients', function (Blueprint $table) {
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete('cascade');

        });
        Schema::table('images', function (Blueprint $table) {
            $table->foreign('recipe_id')->references('id')->on('recipes')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('likes');
        Schema::dropIfExists('comments');
    }
};
