<?php

namespace App\Http\Controllers;
use App\Models\Recipe;
use App\Models\Image;
use App\Models\Ingredient;
use App\Models\RecipeIngredient;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class RecipeController extends Controller
{
    public function postRecipe(Request $request){
        $user = Auth::user();
        $recipe=new Recipe();
        $recipe->user_id=$user->id;
        $recipe->name=$request->name;
        $recipe->cuisine=$request->cuisine;
        $recipe->nb_likes=0;
        $recipe->save();
        

        $images = $request->file('image');
        foreach ($images as $key=>$image){
            if ($request->hasFile('image')) {
                $path = $request->file('image')[$key]->store('public/recipe_images/');
                $path = basename($path);
                $r_image=new Image();
                $r_image->recipe_id=$recipe->id;
                $r_image->image_url = $path;
                $r_image->save();
            }
        }
        $ingredients=$request->ingredients;
        foreach ($ingredients as $i){
            $existing_ing=Ingredient::where('name',$i)->first();
            if(!$existing_ing){
                $ingredient=new Ingredient();
                $ingredient->name=$i;
                $ingredient->save();
                $r_details=new RecipeIngredient();
                $r_details->recipe_id=$recipe->id;
                $r_details->ingredient_id=$ingredient->id;
                $r_details->save();
            }
            else{
                $r_details=new RecipeIngredient();
                $r_details->recipe_id=$recipe->id;
                $r_details->ingredient_id=$existing_ing->id;
                $r_details->save();
            }
            
        }
        $ingredientNames=$recipe->ingredients()->pluck('name');
        $recipe->ingredients=$ingredientNames;
        return response()->json([
            'message' => 'Recipe added successfully',
            'recipe_owner'=>$user->username,
            'recipe'=>$recipe,
        ]);
        
    }

    public function searchRecipe(Request $request){
        $filter=$request->search;
        $all_recipes=Recipe::all();
        $searchByCuisine=Recipe::all()->where('cuisine',$filter);
        $searchByIngredient=Recipe::whereHas('ingredients',
        function ($query) use ($filter) {
        $query->where('name', $filter); 
        })->get();
        
        if ($searchByCuisine->count() > 0) {
            return response()->json([
                'cuisine'=>$filter,
                'filter'=>$searchByCuisine
            ]);
        } elseif($searchByIngredient->count()>0){
            return response()->json([
                'ingredient'=>$filter,
                'recipes'=>$searchByIngredient
            ]);
        }
        else{
            return response()->json([
                'all_recipes'=>$all_recipes
            ]);
        }
    }

    public function like(Request $request){
        $user = Auth::user();
        $recipe_id = $request->id;
        $recipe = Recipe::find($recipe_id);      
        $already_liked = Like::where("user_id", $user->id)->where("recipe_id", $recipe_id)->first();     
        if (!$already_liked) {
            $like = new Like;
            $like->user_id = $user->id;
            $like->recipe_id = $recipe_id;
            $like->save();            
            $recipe->increment('nb_likes');
            return response()->json([
                'status' => 'Successful like',
            ]);
        } else {
            $already_liked->delete();
            $recipe->decrement('nb_likes');   

            return response()->json([
                'status' => 'Successful unlike',
            ]);
        }
    }
    public function comment(Request $request){
        $user = Auth::user();
        $recipe_id = $request->id;
        $comment_text=$request->comment;
        $comment=new Comment;
        $comment->user_id=$user->id;
        $comment->recipe_id=$recipe_id;
        $comment->comment_text=$comment_text;
        $comment->save();
        $comment->owner=$user->username;
        return response()->json([
            'status' => 'Success',
            'comment'=>$comment
            ]);
    }
}



