const Course = require("../models/Course");
const Tag = require("../models/tag");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");
require("dotenv").config();
//createCourse

exports.createCourse = async (req,res)=>{
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag} = req.body;
        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //check for instructor

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found",
            })
        }
        //check if the tag is valid
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tagr details not found",
            })
        }

        //upload img to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //create db entry for course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagdetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        //add new course to instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{courses:newCourse._id},

            },
            {new:true},
        );
        //add to tag
        await Tag.findByIdAndUpdate(
            {_id:tagDetails._id},
            {

                $push:{courses:newCourse._id},
            },
            {new:true},
        );
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Failed to create Course",
            error:err.message,
        });
    }
};


//getAllCourses

exports.getAllCourses = async(req,res)=>{
    try{
        const allCourses = await Course.find({});

        return res.status(200).json({
            success:true,
            message:"Data for all course fetched successfully",
            data:allCourses,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Failed to fetch Course data",
            error:err.message,
        });
    }
}

//get Course Details

exports.getCourseDetails = async (req,res)=>{
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.findById(courseId)
        .populate(
            {
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                },
            }
        )
        .populate("category")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        }).exec();

        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails,
        });

         
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message,
        });
    }
};
