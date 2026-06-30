const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

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

async function sendVerificationEmail(email,otp){
    try{

        const mailResponse = await mailSender(email,"Verification Email From StudyNotion",otp);
        console.log("Email Sent Successfully",mailResponse);
    }
    catch(err){
        console.log("Error Occured while sending mail");
        throw err;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);