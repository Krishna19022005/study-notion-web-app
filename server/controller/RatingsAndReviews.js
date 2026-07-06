const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

//create Rating

exports.createRating = async (req,res)=>{
    try{
        const userId = req.body.user.id;
        const {rating,review,courseId} = req.body;

        const courseDetails = await Course.findOne({
            _id:courseId,
            studentsEnrolled:{$eleMatch:{$eg:userId}},
        });

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in the course",
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId,
            },
        );
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user",
            });
        }
        //create rating and review
        const ratingReview = await ratingReview.create(
            {
                rating,review,
                course:courseId,
                user:userId,
            }
        );
        //update couse with rating
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id:courseId},
            {
                $push:{
                    ratingAndReview:ratingReview._id,
                }
            },
            {new:true}
        );

        console.log(updatedCourse);
        return res.status(200).json({
            success:true,
            message:"Rating and review crearted Successfully",
            ratingReview
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//getAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
        const {courseId} = req.body;
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Type.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        if(rating.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }

        //if no rating/review
        return res.status(200).json({
            success:true,
            message:"Avg Rating is 0, not rating given yet",
        });

    }
    catch(err){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//get All Rating And Review
exports.getAllRatingAndReviews = async(req,res)=>{
    try{
        const allReviews = await RatingAndReview.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image",
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName",
                                }).exec();
        
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};