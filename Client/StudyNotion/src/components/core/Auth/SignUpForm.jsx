import React, { useState } from 'react'
import { AiOutlineEye ,AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUpForm =()=>{
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

    return (
        <div>
            <div>
                <button>
                    Student
                </button>
                <button>
                    Instructor
                </button>
            </div>
            <form>
                <div>
                    <label>
                        <p>First Name<sup>*</sup></p>
                        <input
                        required
                        type="text"
                        name='firstName'
                        onChange={changeHandler}
                        placeholder='Enter First Name'
                        value={formData.firstName}
                        />
                    </label>

                    <label>
                        <p>Last Name<sup>*</sup></p>
                        <input
                        required
                        type="text"
                        name='lastName'
                        onChange={changeHandler}
                        placeholder='Enter Last Name'
                        value={formData.firstName}
                        />
                    </label>
                </div>

                <label>
                    <p>Email Address<sup>*</sup></p>
                    <input
                    required
                    type="text"
                    name='email'
                    onChange={changeHandler}
                    placeholder='Enter First Name'
                    value={formData.firstName}
                    />
                </label>

                <div>
                    <label>
                        <p>Create password<sup>*</sup></p>
                        <input
                        required
                        type={showPassword ? ("text"):("password")}
                        name='password'
                        onChange={changeHandler}
                        placeholder='Enter Password'
                        value={formData.password}
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>
                            {showPassword?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                        </span>
                    </label>
                    <label>
                        <p>Confirm password<sup>*</sup></p>
                        <input
                        required
                        type={showPassword ? ("text"):("password")}
                        name='confirmPassword'
                        onChange={changeHandler}
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>
                            {showPassword?(<AiOutlineEyeInvisible/>):(<AiOutlineEye/>)}
                        </span>
                    </label>
                </div>

                <button>
                    Create Account
                </button>
            </form>
        </div>
    )
}
export default SignUpForm