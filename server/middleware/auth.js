const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//auth
exports.auth = async (req,res,next)=>{
    try{
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            });
        }
        //verify token
        try{
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(err){
            return res.status(401).json({
                success:false,
                message:'Token is invalid',
            }); 
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating th e token",
        })
    }
};

//isStudent
exports.isStudent = async (req,res,next)=>{
    try{

        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for students",
            });
        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pls try again",
        })
    }
}

//isInstructor
exports.isInstructor = async (req,res,next)=>{
    try{

        if(req.user.role!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor",
            });
        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pls try again",
        })
    }
}

//isAdmin

exports.isAdmin = async (req,res,next)=>{
    try{

        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin",
            });
        }
        next();

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified,pls try again",
        })
    }
}