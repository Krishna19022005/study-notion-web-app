const mongoose = require("mongoose");

const courseSchems = new mongoose.Schema({
    coursename:{
        type:string,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:string,
        required:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatUWullLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReview:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    },
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag",
    },
    studentsEnrolled:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
});

module.exports = mongoose.model("Course",courseSchema);