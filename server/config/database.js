const mongoose = require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>console.log("Database Connected Successfully"))
    .catch((err)=>{
        console.log("Unable to establish db connection");
        console.error(err);
        process.exit(1);
    })
};