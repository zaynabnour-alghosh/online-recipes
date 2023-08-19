<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShoppingListDetail extends Model
{
    use HasFactory;
    public function recipes()
    {
        return $this->belongsTo(Recipe::class, 'recipe_id');
    }
    public function list()
    {
        return $this->belongsTo(Shoppinglist::class, 'list_id');
    }
}
