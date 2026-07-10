import React from 'react'
import frameImg from "../../../assets/Images/frame.png"
const Template =({title,desc1,desc2,image,formType,setIsLoggedIn})=>{
    return (
        <div>
            <div>
                <h1>{title}</h1>
                <p>
                    <span>{desc1}</span>
                    <span>{desc2}</span>
                </p>
                {formType === "signUp"?
                (<SignUp/>):(<Login/>)}

                <div>
                    <div></div>
                    <p>OR</p>
                    <div></div>
                </div>

                <button>
                    <p>Sign Up with Google</p>
                </button>
            </div>
            <div>
                <img src={frameImg}
                alt='Pattern'
                width={558}
                height={504}
                loading='lazy'
                />
                
                <img src={image}
                width={558} height={490}
                loading='lazy'
                />
            </div>

        </div>
    )
}

export default Template