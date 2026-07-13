import {toast} from "react-hot-toast"
import {setToken} from '../../slice/authSlice';
import {resetCart} from '../../slice/cartSlice'
import {setUser} from '../../slice/profileSlice'
import {apiConnector} from '../apiconnector'
import {endpoints} from '../apis'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

export function sendOTP(email,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST",SENDOTP_API,{
                email,
                checkUserPresent:true,
            });
            console.log("OTP api response",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP sent Successfully")
            navigate("/verify-email")
        }
        catch(err){
            console.log("OTP api error",err);
            toast.error("Could not send OTP")
        }
        toast.dismiss(toastId);
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    const toastId = toast.loading("Loading...")
    return async (dispatch)=>{
        try{
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SignUp API response ",response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("SignUp Successful");
            navigate("/login");
        }
        catch(error){
            console.log("Signup api error",error)
            toast.error("SignUp failed");
            navigate("/signUp")
        }
        toast.dismiss(toastId)
    }
}
export function login(email,password,navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("POST",LOGIN_API,{
                email,password
            })
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ?response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({ ...response.data.user, image: userImage }))

            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile");
        }
        catch(err){
            console.log("Login Api error ",err);
            toast.error("Login Failed");
        }
        toast.dismiss(toastId);
    }
}
export function logout(navigate){
    return (dispatch)=>{
         dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}