const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get User id
        const id = req.user.id;

        if(!contachNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            }); 
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        })
    }
};

//deleteAccount

exports.deleteAccount = async (req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not registered",
            });
        }

        await Profile.findOneAndDelete({_id:userDetails.additionalDetails});
        //todo: unenroll user from all enrolled courses
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    }
};

exports.getAllUserDetails = async (req,res)=>{
    try{
        const id = req.user.id;

        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"User data fetched Successfully",
            userDetails,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something Went wrong",
        });
    }
};

