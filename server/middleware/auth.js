const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth

exports.auth = async (req, res, next) => {
    try {
       const authHeader = req.headers.authorization;

        const token =
            req.cookies?.token ||
            req.body?.token ||
            authHeader?.split(" ")[1];
                console.log("Extracted Token:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is Missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();
    } catch (err) {
        console.log("AUTH ERROR:", err);

        return res.status(401).json({
            success: false,
            message: err.message,
        });
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