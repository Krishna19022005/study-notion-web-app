const mongoose = require("mongoose");

const ratingAndReview = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    reviwe:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("RatingAndReview",ratingAndReview)