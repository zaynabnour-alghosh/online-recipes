<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shoppinglist extends Model
{
    use HasFactory;
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class,'shoppinglist_details','list_id' ,'recipe_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
