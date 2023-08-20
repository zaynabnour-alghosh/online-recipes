import "./style.css";
import {BiLeaf} from "react-icons/bi"
import { sendRequest } from "../../config/request";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=({onToggle,user,setUser})=>{
	const navigate = useNavigate();
    const loginButton=useRef();
    const [credentials,setCredentials]=useState({
        email:"",
        password:"",
    });
    const { email, password } = credentials;
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value});
    };
    const handleLogin=async(e)=>{
        loginButton.current.disabled=true;
        loginButton.current.textContent="Loading...";
        if(!email || !password){
            loginButton.current.disabled = false;
			loginButton.current.textContent = "Fill all fields";
            setTimeout(() => {
				loginButton.current.textContent = "Log In";
			}, 2000);
			return;
        }
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/guest/login",
                body:credentials,
            });

            if(response.status==="Success"){
                loginButton.current.disabled = false;
				loginButton.current.textContent = "Success";
                localStorage.setItem(
					"token",
					response.data.token
				);
                setTimeout(() => {
					loginButton.current.textContent = "Logging In...";
                    const username=response.data.username;
                    console.log(username);
                    setUser(username);
                }, 1000);
                setTimeout(() => {navigate(`/home/${response.data.username}`)},1000);
            }
        }catch(error){
            console.log(error);
			loginButton.current.disabled = false;
			loginButton.current.textContent = "Failed";
			setTimeout(() => {
				loginButton.current.textContent = "Log In";
			}, 2000);
        }
    }
    return (
        <div className="login page container flex center">
            <div className="login-container flex column center">
                <div className="icon-leaf">
                    <BiLeaf  size={50} />
                </div>
                <h1>Welcome Back!</h1>        
                <div className="login-row flex column">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
						value={email}
						onChange={handleChange}
                        />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password"
						value={password}
						onChange={handleChange}
                        />
                    <button 
                        className="btn-login"
                        ref={loginButton}
						onClick={handleLogin}>
                            Log in
                    </button>
                    <div className="option-signup">
                        Don't have an account?<span onClick={() => onToggle()}>Sign up</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Login;
