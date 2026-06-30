const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//sendOtp to db

exports.sendOTP = async(req,res)=>{
    try{
        //fetch email from req body
        const {email} = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Exist",
            });
        }
        //generate otp
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("Generated Otp:",otp);

        //check if otp is unique
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        //create a db enty of otp
        const otpBody = await OTP.create({
            email,otp
        })
        console.log("otp Body",otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent Successfully",
            otp,
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message, 
        })
    }
}

//sign Up
exports.signUp =async (req,res)=>{
   
    try{
         //fetch data from req body
        const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;
        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !oto || !contactNumber){
            return res.status(403).json({
                success:false,
                message:"All Fields are Required",
            });
        }

        //match passwords
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords are not matching, reEnter passwords",
            });
        }
        
        //check if user exists
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            });
        }

        //find the most recent otp stored for user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1})/limit(1);

        //validate otp

        if(recentOtp !== otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }
        //hash password
        const hashedPass = await bcrypt.hash(password,10);

        //create db entry
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPass,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        return res.status(200).json({
            success:true,
            message:"User registered Successfully",
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User Cannot be registered.Please try again",
        });
    }  
};

//login
exports.login = async (req,res)=>{
    try{
        //get data from req body
        const {email,password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Fields are required",
            });
        }
        //check if user exists
        const user = await User.findOne({email}).populate("additionalDEtails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not Registered, SignUp",
            });
        }

        //generate JWT token
        if(await bcrypt.compare(password,user.password)){
            const payload ={
                email:user.email,
                id:user._id,
                role:user.role,
            }
            const token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token = token;
            user.password = undefined;

            //create cookie
            const options ={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,user,
                message:"Logged in Successfully",
            })
        }else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password!",
            });
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Login Failure! Try again",
        })
    }
};

//change password




















