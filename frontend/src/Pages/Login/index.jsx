import "./style.css";
import {BiLeaf} from "react-icons/bi"
const Login=({onToggle})=>{
    return (
        <div className="login page container flex center">
            <div className="login-container flex column center">
                <div className="icon-leaf">
                    <BiLeaf  size={50} />
                </div>
                <h1>Welcome Back!</h1>        
                <div className="login-row flex column">
                    <input type="email" placeholder="Email Address" />
                    <input type="password" placeholder="Password" />
                    <button className="btn-login">Log in</button>
                    <div className="option-signup">
                        Don't have an account?<span onClick={() => onToggle()}>Sign up</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Login;
