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
            {new:true}
        ).populate("subSection").exec();
        return res.status(200).json({
            success:true,
            message:"Sub Section Created Successfully",
             data: updatedSection,
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Sever Error",
            error:err.message,
        });
    }
};

//update
exports.updateSubSection = async (req,res)=>{
    try{
        const {sectionId,title,description} = req.body;
        const subSection = await SubSection.findById(sectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
                error:err.message,
            });
        }
        if(title !== undefined){
            subSection.title = title;
        }
        if(description){
            subSection.description = description;
        }

        if(req.files && req.files.video !== undefined){
            const video = req.file.videoFile;
            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
    
        }
        await subSection.save();

        return res.json({
            success: true,
            message: "Section updated Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"An error occured while updating the section",
        })
    }
}
//delete
exports.deleteSubSection = async (req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;
        await Section.findByIdAndUpdate(
            {_id:sectionId},
            {
                $pull:{
                    subSection:subSectionId,
                },
            },
            {new:true}
        );

        const deletedSubSection = await SubSection.findByIdAndDelete({_id:subSectionId});

        if(!deletedSubSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found",
            })
        }

        return res.json({
            success:true,
            message:"SubSection deleted Successfully",
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"An error occured while deleting the section",
        })
    }
}