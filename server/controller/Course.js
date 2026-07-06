const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
//createCourse

exports.createCourse = async (req,res)=>{
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn,price,tag,category} = req.body;
        const thumbnail = req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !category || !price || !tag || !thumbnail){
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
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category details not found",
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
            category:categoryDetails._id,
            tag:[tag],
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
        //add to category
        await Category.findByIdAndUpdate(
            {_id:categoryDetails._id},
            {

                $push:{courses:newCourse._id},
            },
            {new:true},
        );
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });
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
        const {courseId} = req.query;
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
