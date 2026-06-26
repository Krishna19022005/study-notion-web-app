const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    otp:{
        type:string,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    },
});

module.exports = mongoose.model("OTP",OTPSchema);