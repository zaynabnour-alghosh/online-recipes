<?php

namespace App\Http\Controllers;
use App\Models\Shoppinglist;
use App\Models\Shoppinglist_detail;
use App\Models\MealPLan;
use App\Models\Recipe;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function createShoppingList(Request $request){
        $user = Auth::user();
        $list_name=$request->name;
        $shoppinglist=new Shoppinglist;
        $shoppinglist->user_id=$user->id;
        $shoppinglist->name=$list_name;
        $shoppinglist->save();
        $shoppinglist->owner=$user->username;
        return response()->json([
            'status'=>'success',
            'shoppinglist'=>$shoppinglist
        ]);
    }
    public function addToShoppingList(Request $request){
        $user = Auth::user();
        $list_id=$request->list_id;
        $recipe_id=$request->recipe_id;
        $list_item=new Shoppinglist_detail;
        $list_item->list_id=$list_id;
        $list_item->recipe_id=$recipe_id;
        $list_item->save();
        $list=Shoppinglist::find($list_id);
        $recipes=$list->recipes;  
        return response()->json([
            'status'=>'success',
            'list_name'=>$list->name,
            'shoppinglist'=>$recipes
        ]);
    }
    public function createMealPlan(Request $request){
        $user = Auth::user();
        $mealplan=new MealPlan;
        $mealplan->user_id=$user->id;
        $mealplan->recipe_id=$request->recipe_id;
        $mealplan->date=$request->date;
        $mealplan->type=$request->type;
        $mealplan->save();
        $recipe=Recipe::find($request->recipe_id);
        $mealplan->owner=$user->username; 
        return response()->json([
            'status'=>'success',
            'mealplan'=>$mealplan,
            'recipe'=>$recipe
        ]);
    }
    public function viewRecipe(Request $request){
        $recipe=Recipe::find($request->id);
        $ingredientNames=$recipe->ingredients()->pluck('name');
        $recipe->ingredients=$ingredientNames;
        $recipe->owner=$recipe->user()->pluck('username');
        $recipe->comment=$recipe->comments()->with('User')->get();
        $images=$recipe->images()->pluck('image_url');
        $recipe->images=$images;
       
        
        return response()->json([
            'status'=>'success',
            'recipe'=>$recipe
        ]);
    }

}
