const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWilllLearn:{
        type:String,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReview:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",}
    ],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:[String],
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },
    ],
    instructions:{
        type:[String],
        required:true,
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createdAt:{
        type:Date,
        Date:Date.now
    },
});

module.exports = mongoose.model("Course",courseSchema);