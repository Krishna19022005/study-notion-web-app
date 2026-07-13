import React, { useState } from 'react'
import { AiOutlineEye ,AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {login} from '../../../services/operations/authApi' 
const LoginForm = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    const [showPassword,setShowPassword] = useState(false);

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]:event.target.value,
            }
        ))
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }
    return (
        <form onSubmit={handleOnSubmit}
        className='flex flex-col w-full gap-y-4 mt-6'>
            <label className='w-full'>
                <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                    Email Address<sup className='text-pink-200'>*</sup>
                </p>
                <input 
                type="text"
                required
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter Email id'
                name='email'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                }}
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                />
            </label>
            <label className='w-full'>
                <div className='relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                    required
                    type={showPassword?("text"):("password")}
                    value={formData.password} 
                    onChange={changeHandler}
                    placeholder='Enter Password'
                    name='password'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18",
                    }}
                    className='relative bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={()=>setShowPassword((prev)=>!prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </div>

                <Link to="/forgetPassword">
                    <p className='text-xs text-blue-100 w-full ml-auto '>
                        Forget Password
                    </p>
                </Link>
            </label>

            <button className='mt-6 text-richblack-900 py-[8px] px-[12px] bg-yellow-50 rounded-[8px] font-medium '>
                Sign In
            </button>
        </form>
    )
}

export default LoginForm