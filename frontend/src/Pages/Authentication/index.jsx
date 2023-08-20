import React, { useState } from "react";
import "./style.css";
import Login from "../Login";
import Signup from "../Signup";
const Authentication=()=>{
    const[login,setLogin]=useState(true);
    return(
        <div className="center flex page">
            {login?
                (<Login onToggle={()=>setLogin(false)} />)
            :
                (<Signup onToggle={()=>setLogin(true)} />)
            }
        </div>
    );
}
export default Authentication;