const Section = requier("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req,res)=>{
    try{
        //data fetch
        const {sectionName,courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:true,
                message:"Missing Properties",
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{courseContent:newSection._id},
            },
            {new:true}
        );//populate section and subsection

        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            updatedCourseDetails,
        })
         
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to create a section",
        })
    }
};

//update section
exports.updateSection = async (req,res)=>{
    try{
        const{sectionName,sectionId} = req.bosy;
        if(!sectionName,sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
        }
        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to update section",
        });
    }
};
//deleteSection

exports.deleteSection = async (req,res)=>{
    try{
        //det id
        const {sectionId} = req.params;
        await Section.findByIdAndDelete(sectionId);
        //TODO should we need to delete entry from couse schema
        return res.status(200).json({
            success:true,
            messsage:"Section deleted successfully",
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to delete section",
        });
    }
}