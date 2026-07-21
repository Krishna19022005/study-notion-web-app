const Course = require("../models/Course");
const Category = require("../models/Category")
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
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

exports.editCourse = async(req,res)=>{
    try{
        const {courseId} = req.body;

        //find Course
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found",
            });
        }
        //Update only provided fields
        const{
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        if(courseName) course.courseName = courseName;
        if(courseDescription) course.courseDescription = courseDescription;
        if(whatYouWillLearn) course.whatYouWillLearn = whatYouWillLearn;
        if(price) course.price = price;
        if(tag) course.tag = tag;
        if(status) course.status = status;
        if(instructions) course.instructions = instructions;

        //update category if changed
        if(category){
            const categoryDetails = await Category.findById(category);
            if(!categoryDetails){
                return res.status(404).json({
                    success:false,
                    message:"Category not found",
                })
            }
            course.category = categoryDetails._id;
        }

        if (req.files && req.files.thumbnailImage) {

            const thumbnail = req.files.thumbnailImage;

            const uploadedImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );

            course.thumbnail = uploadedImage.secure_url;
        }
        await course.save();

        const updatedCourse = await Course.findById(courseId)
            .populate("instructor")
            .populate("category")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            });
            
        return res.status(200).json({
            success:true,
            message:"Course Updated Successfully",
            data:updatedCourse,
        })
    }catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Failed to update course",
            error:error.message,
        });
    }
}

exports.deleteCourse = async(req,res)=>{
    try{
        const {courseId} = req.body;
        //check if course exist
        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not Found",
            });
        }
        //remove course from instructor
        await User.findByIdAndUpdate(
            course.instructor,
            {
                $pull:{
                    courses:course._id,
                },
            }
        );
        //remove course froom category
        await Category.findByIdAndUpdate(
            course.category,
            {
                $pull:{
                    courses:course._id
                }
            }
        );
        //remove course from enrolled students
        for(const studentId of course.studentsEnrolled){
            await User.findByIdAndUpdate(
                studentId,
                {
                    $pull:{
                        courses:course._id,
                    }
                }
            )
        }
        //delete all sections and subsections
         for (const sectionId of course.courseContent) {

            const section = await Section.findById(sectionId);

            if (section) {

                // Delete all subsections
                for (const subSectionId of section.subSection) {
                    await SubSection.findByIdAndDelete(subSectionId);
                }

                // Delete section
                await Section.findByIdAndDelete(sectionId);
            }
        }

        //finally delete the course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course deleted successfully",
        })
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Failed to delete course",
            error:error.message,
        });
    }
}