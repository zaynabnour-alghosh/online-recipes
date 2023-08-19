<?php

namespace App\Http\Controllers;
use App\Models\Shoppinglist;
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
    
}
