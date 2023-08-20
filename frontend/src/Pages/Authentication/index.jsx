import React, { useState } from "react";
import "./style.css";
import Login from "../Login";
import Signup from "../Signup";
const Authentication=({user,setUser})=>{
    const[login,setLogin]=useState(true);
    return(
        <div className="center flex page">
            {login?
                (<Login onToggle={()=>setLogin(false)}  user={user} setUser={setUser}/>)
            :
                (<Signup onToggle={()=>setLogin(true)} user={user} setUser={setUser}/>)
            }
        </div>
    );
}
export default Authentication;