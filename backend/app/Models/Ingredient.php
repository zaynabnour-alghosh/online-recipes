<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class, 'recipe_ingredients', 'recipe_id', 'ingredient_id');
    }
}
