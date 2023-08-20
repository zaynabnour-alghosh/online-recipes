import "./style.css";
import {BiLeaf} from "react-icons/bi"
const Signup=({ onToggle })=>{
    return (
        <div className="signup page container flex center">
            <div className="signup-container flex column center">
                <div className="icon-leaf">
                    <BiLeaf  size={50} />
                </div>
                <h1>Create your account</h1>        
                <div className="signup-row flex column">
                    <input type="username" placeholder="Username" />
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <button className="btn-signup">Sign up</button>
                    <div className="option-login">
                        Already have an account?<span  onClick={() => onToggle()}>Log in</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Signup;
