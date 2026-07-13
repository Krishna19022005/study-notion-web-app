import React, { useState } from 'react'
import { AiOutlineEye ,AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

import {sendOTP} from '../../../services/operations/authApi'
import {setSignUpData} from '../../../slice/authSlice'
import {ACCOUNT_TYPE} from '../../../utils/constants'
import Tab from '../../Common/Tab'

const SignUpForm =()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,[event.target.name]:event.target.value,
            }
        ))
    }
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnSubmit =(e)=>{
        e.preventDefault();

        if(formData.password!==formData.confirmPassword){
            toast.error("Passwords Do not match");
            return;
        }
        const signUpData ={
            ...formData,accountType
        }

        dispatch(setSignUpData(signUpData));
        dispatch(sendOTP(formData.email,navigate));

        setFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }
    
    //data to pass to the tab component
    const tabData =[
        {
            id:1,
            tabName:"Student",
            type:ACCOUNT_TYPE.STUDENT,
        },
        {
            id:2,
            tabName:"Instructor",
            type:ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return (
        <div>
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-4 rounded-full max-w-max'>
                <button
                className={`${accountType ==="Student"?"bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"}
                    py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={()=>setAccountType("Student")}
                >
                    Student
                </button>
                <button
                className={`${accountType ==="Instructor"?"bg-richblack-900 text-richblack-5"
                    :"bg-transparent text-richblack-200"}
                    py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={()=>setAccountType("Instructor")}
                >
                    Instructor
                </button>
            </div>
            {/* <Tab tabData ={tabData} field ={accountType} setField ={setAccountType} /> */}
            <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-y-2'>
                <div className='flex gap-x-4'>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name<sup className="text-pink-200">*</sup></p>
                        <input
                        required
                        type="text"
                        name='firstName'
                        onChange={changeHandler}
                        placeholder='Enter First Name'
                        style={{
                            boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        value={formData.firstName}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>

                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name<sup className="text-pink-200">*</sup></p>
                        <input
                        required
                        type="text"
                        name='lastName'
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        style={{
                            boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        value={formData.lastName}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                    </label>
                </div>

                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address<sup className="text-pink-200">*</sup></p>
                    <input
                    required
                    type="text"
                    name='email'
                    onChange={changeHandler}
                    placeholder='Enter Email id'
                    style={{
                        boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    value={formData.email}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>

                <div classname="flex flex-col gap-y-6">
                    <label >
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Create password<sup className="text-pink-200">*</sup></p>
                        <div className='relative'>
                            <input
                            required
                            type={showPassword ? ("text"):("password")}
                            name='password'
                            onChange={changeHandler}
                            placeholder='Enter Password'
                            style={{
                                boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            value={formData.password}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                            <span className="absolute right-3 top-[14px]  z-[10] cursor-pointer text-richblack-300"
                            onClick={()=>setShowPassword((prev)=>!prev)}>
                                {showPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                            </span>
                        </div>
                    </label>
                    <label>
                        <p className="mb-1 mt-3 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm password<sup className="text-pink-200">*</sup></p>
                        <div className='relative'>
                            <input
                            required
                            type={showConfirmPassword ? ("text"):("password")}
                            name='confirmPassword'
                            onChange={changeHandler}
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            style={{
                                boxShadow: "inset 0 -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className=" w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                            <span className="absolute right-3 top-[14px] z-[10] cursor-pointer text-richblack-5"
                            onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                {showConfirmPassword?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                            </span>
                        </div>
                    </label>
                </div>

                <button  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Create Account
                </button>
            </form>
        </div>
    )
}
export default SignUpForm