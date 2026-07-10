import React, { useState } from 'react'
import { AiOutlineEye ,AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const LoginForm = ()=>{
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [showPassword,setShowPassword] = useState(false);

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,[event.target.name]:event.target.value,
            }
        ))
    }
    return (
        <form>
            <label>
                <p>Email Address<sup>*</sup></p>
                <input 
                type="text"
                required
                value={FormData.email}
                onChange={changeHandler}
                placeholder='Enter Email id'
                name='email'
                 />
            </label>
            <label>
                <p>
                    Password<sup>*</sup>
                </p>
                <input 
                required
                type={showPassword?("text"):("password")}
                value={FormData.password} 
                onChange={changeHandler}
                placeholder='Enter Password'
                name='password'
                />
                <span onClick={()=>setShowPassword((prev)=>!prev)}>
                    {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                </span>

                <Link to="/forgetPassword">
                    <p>
                        Forget Password
                    </p>
                </Link>
            </label>

            <button>
                Sign In
            </button>
        </form>
    )
}

export default LoginForm