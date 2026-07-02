const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();
//create subSection

exports.createSubSection = async (req,res)=>{
    try{
        //fetch datda
        const {sectionId,title,timeDuration,description} =req.body;
        //extract file/video
        const video = req.files.videoFile;

        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create subSection
        const SubSectionDetails = await SubSection.create({
            title,timeDuration,
            description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this subsection details
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$push:{
                subSection:SubSectionDetails._id,
            }},
            {new:true00}
        );
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success:true,
            message:"Internal Sever Error",
            error:err.message,
        });
    }
};
//pending 
//update
//delete