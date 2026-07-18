const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
exports.updateProfile = async (req,res)=>{
    try{
        //get data
        const {dateOfBirth="",about="",contactNumber,gender} = req.body;
        //get User id
        const id = req.user.id;

        if(!gender || !id){
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
//update picture
exports.updateDisplayPicture = async (req,res)=>{
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,1000
        )
        console.log(image);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: image.secure_url },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Image Updated Successfully",
            user: updatedUser,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }  
};

//get Enrolled Courses
exports.getEnrolledCourses = async(req,res)=>{
    try{
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("courses").exec();

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Could not find user",
            });
        }
        return res.status(200).json({
            success:true,
            data:userDetails.courses,
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
