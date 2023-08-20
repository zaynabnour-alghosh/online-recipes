import "./style.css";
import {BiLeaf} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { sendRequest } from "../../config/request";

const Signup=({ onToggle,user,setUser })=>{
    const navigate = useNavigate();
    const signupButton=useRef();
    const [data,setData]=useState({
        username:"",
        email:"",
        password:"",
    });
    const { username,email,password } = data;
    const handleChange=(e)=>{
        setData({...data,[e.target.name] : e.target.value});
    };
    const handleSignup=async(e)=>{
        signupButton.current.disabled=true;
        signupButton.current.textContent="Loading...";
        if(!username || !email || !password){
            signupButton.current.disabled = false;
			signupButton.current.textContent = "Fill all fields";
            setTimeout(() => {
				signupButton.current.textContent = "Sign Up";
			}, 2000);
			return;
        }
        try{
            const response=await sendRequest({
                method:"POST",
                route:"/guest/register",
                body:data,
            });

            if(response.status==="Success"){
                signupButton.current.disabled = false;
				signupButton.current.textContent = "Success";
                setTimeout(() => {
                    const username=response.data.username;
                    console.log(username);
                    setUser(username);
                }, 1000);
                setTimeout(() => {
                    navigate("/");
                    onToggle(); 
                },1000);
            }
        }catch(error){
            console.log(error);
			signupButton.current.disabled = false;
			signupButton.current.textContent = "Failed";
			setTimeout(() => {
				signupButton.current.textContent = "Sign Up";
			}, 2000);
        }
    }
    return (
        <div className="signup page container flex center">
            <div className="signup-container flex column center">
                <div className="icon-leaf">
                    <BiLeaf  size={50} />
                </div>
                <h1>Create your account</h1>        
                <div className="signup-row flex column">
                    <input 
                        type="username" 
                        placeholder="Username" 
                        name="username"
						value={username}
						onChange={handleChange}
                        />
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
                        className="btn-signup"
                        ref={signupButton}
						onClick={handleSignup}
                        >Sign up</button>
                    <div className="option-login">
                        Already have an account?<span  onClick={() => onToggle()}>Log in</span>
                    </div>    
                </div>
            </div>
        </div>
      );
} 
export default Signup;
