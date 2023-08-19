<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'recipe_ingredients', 'recipe_id', 'ingredient_id');
    }
    public function images()
    {
        return $this->hasMany(Image::class, 'recipe_id');
    }
    public function likes()
    {
        return $this->hasMany(Like::class, 'recipe_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'recipe_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function shoppinglists()
    {
        return $this->belongsToMany(Recipe::class,'shoppinglists_details','list_id' ,'recipe_id')>withPivot('recipe_id', 'list_id');
    }

}

