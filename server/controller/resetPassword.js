const User = reequire("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
//resetPasswordToken
exports.resetPasswordToken = async (requestAnimationFrame,res)=>{
    try{
        //get email from req
        const email = req.body.email;
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"Email not Registered",
            });
        }
        //generate token
        const token = crypto.randomUUID();
        //add token to user
        const updatedDetails = await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000,
            },
            {new:true},
        )
        //create url
        const url =`http://localhost:3000/update-password/${token}`;

        await mailSender(email,"Password Reset",`Password Reset Link: ${url}`);

        return res.json({
             success:true,
            message:"Email sent successfully",
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong",
        });
    }

};

//reset password
exports.resetPassword = async (req,res)=>{
    try{
        //data fetch
        const {password,confirmPassword,token} = req.body;
        //validation
        if(password!==confirmPassword){
            return res.json({
                success:false,
                message:"Password not Matching",
            });
        }
        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is Invalid',
            })
        }
        //check token expiry
        if(userDetails.resetPasswordExpires < Date.noe()){
            return res.json({
                success:false,
                message:"Token is expired",
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);

        //update password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );

        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        });
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong",
        });
    }
};