import React from 'react'
import frameImg from "../../../assets/Images/frame.png"
import {toast} from 'react-hot-toast'
import Login from './LoginForm'
import SignUp from './SignUpForm'
import {FcGoogle} from 'react-icons/fc'
import {useSelector} from 'react-redux'

const Template =({title,desc1,desc2,image,formType,setIsLoggedIn})=>{
    
    return (
        <div className='flex mx-auto flex-col-reverse justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12'>
            <div className='mx-auto w-11/12 max-w-[450px] md:mx-0 '>
                <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] '>{title}</h1>
                <p className='text-[1.125rem] mt-4 leading-[1.625rem] '>
                    <span className='text-richblack-100'>{desc1}</span><br />
                    <span className='text-blue-100 font-bold italic'>{desc2}</span>
                </p>
                {formType === "signUp"?
                (<SignUp/>):(<Login/>)}

                <div className='w-full flex items-center my-4 gap-x-2'>
                    <div className='w-full h-[1px] bg-richblack-700'></div>
                    <p className=' text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                    <div className='w-full h-[1px] bg-richblack-700'></div>
                </div>

                <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
                border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                    <FcGoogle/>
                    <p>Sign Up with Google</p>
                </button>
            </div>
            <div className='relative w-11/12 max-w-[450px]  '>
                <img src={frameImg}
                alt='Pattern'
                width={558}
                height={504}
                loading='lazy'
                />
                
                <img src={image}
                width={558} height={490}
                loading='lazy'
                className='absolute -top-4 right-4'
                />
            </div>
                 
        </div>
    )
}

export default Template