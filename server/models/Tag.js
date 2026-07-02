const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name:{
        type:string,
        trim:true,
        required:true,
    },
    description:{
        type:String,
    },
    courses:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
       },
    ],
});

module.exports = mongoose.model("Tag",tagSchema);