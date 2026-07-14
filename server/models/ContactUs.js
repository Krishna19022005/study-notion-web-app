const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    countryCode:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Contact",contactSchema);