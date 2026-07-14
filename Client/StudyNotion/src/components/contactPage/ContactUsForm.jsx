import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
import {toast} from 'react-hot-toast'
import countryCode from "../../data/countrycode.json"
import {apiConnector} from "../../services/apiconnector"
import {contactUsEndpoint} from "../../services/apis"

const ContactUsForm = () =>{
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) =>{
        console.log("Form Data - ",data)
        const toastId = toast.loading("Loading...")
        try{
            const res = await apiConnector(
                "POST",
                contactUsEndpoint.CONTACT_US_API,
                data,
            )
            console.log("Email Res -",res)
            toast.success("Message Sent Successfully");
        }
        catch(err){
            console.log("Error Message - ",err.message);
            toast.error("Unable to submit form");

        }
        finally{
            toast.dismiss(toastId);
        }
    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"",
                countryCode:"+91"
            })
        }
    },[reset,isSubmitSuccessful])

    return(
        <form
        className='flex flex-col gap-7 w-full max-w-[550px]'
        onSubmit={handleSubmit(submitContactForm)}
        >
            <div className='flex flex-col gap-5 '>
                {/* firstName */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="firstName" className='label-style'>
                        First Name
                    </label>
                    <input 
                    type="text" 
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    className='form-style'
                    {...register("firstName",{required:true})}
                    />
                    {errors.firstName &&(
                        <span className='-mt-1 text-[12px] text-yellow-100'>
                            Please Enter Your Name
                        </span>
                    )}
                </div>

                {/* lastName */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="lastName" className='label-style'>
                        Last Name
                    </label>
                    <input 
                    type="text" 
                    name="lastName"
                    id="lastName"
                    placeholder='Enter Last Name'
                    className='form-style'
                    {...register("lastName",{required:true})}
                    />
                    {errors.lastName &&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your Last Name
                        </span>
                    )}
                </div>

                {/* email */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="email" className="label-style">
                        Email Address
                    </label>
                    <input 
                    type="email" 
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='form-style'
                    {...register("email",{required:"Please enter your email"})}
                    />
                    {errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">{errors.email.message}</span>
                    )}
                </div>

                {/* phone number */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="phoneNo" className="label-style">
                        Phone Number
                    </label>
                    <div className='flex gap-5'>
                        {/* countrycode */}
                        <div className='flex w-[81px] flex-col gap-2'>
                            <select
                             id="countryCode"
                             className='form-style'
                             {...register("countryCode",{required:"Please Enter a Country code"})}
                            >
                                {countryCode.map((country,index)=>(
                                    <option key={index} value={country.code}>{country.code}</option>
                                ))}
                             </select>
                             {errors.countryCode &&(
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.countryCode.message}
                                </span>
                             )}
                        </div>
                        {/* phone number input */}
                        <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                            <input 
                            type="number"
                            id="phoneNo"
                            placeholder='12345 67890'
                            className='form-style'
                            {...register("phoneNo",{
                                required:"Please Enter your Phone no:",
                                pattern:{
                                    value:/^[0-9]{10}$/,
                                    message:"Phone number must be exactly 10 digits"
                                }
                            })}
                            />
                            {errors.phoneNo && (
                                <span className="mt-1 text-[12px] text-yellow-100">
                                    {errors.phoneNo.message}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* message */}
                <div className='flex flex-col gap-2 '>
                    <label htmlFor="message" className='label-style'>
                        Message
                    </label>
                    <textarea name="message" id="message" cols="30" rows="9"
                    placeholder='Enter Your Message Here' className='form-style'
                    {...register("message",{required:true})}
                    />
                    {errors.message &&(
                       <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your Message.
                        </span>
                    )}
                </div>

                <button
                type='submit' className='rounded  md bg-yellow-50 px-6 py-3 text-center text-lg font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-200 hover:scale-95 hover:shadow-none'
                >
                    Send Message
                </button>
            </div>
        </form>
    )
}

export default ContactUsForm;