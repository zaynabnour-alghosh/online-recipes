<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;

Route::group(["middleware" => "auth:api"], function(){
    $user = Auth::user();     
    Route::group(["prefix" => "user"], function(){
        Route::post("post-recipe", [RecipeController::class, "postRecipe"]);
        Route::post("view-my-recipes", [RecipeController::class, "viewMyRecipes"]);

        Route::post("search-recipe", [RecipeController::class, "searchRecipe"]);
        Route::post("like-recipe", [RecipeController::class, "like"]);
        Route::post("add-comment", [RecipeController::class, "comment"]);
        Route::post("new-shoppinglist",[UserController::class,"createShoppingList"]);
        Route::post("add-to-shoppinglist",[UserController::class,"addToShoppingList"]);
        Route::post("view-recipe",[UserController::class,"viewRecipe"]);
        Route::post("create-mealplan",[UserController::class,"createMealPlan"]);
        
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);

    });

});
Route::group(["prefix" => "guest"], function(){
    //catch api for unauthorized users
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    //login & signup 
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});