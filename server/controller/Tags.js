const Tag = require("../models/Tag");
//create tag handler
exports.createTag = async (req,res)=>{
    try{
        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All firlds are required",
            })
        }
        const tagDetails = await Tag.create({
            name:name,
            description:description
        })
        console.log(tagDetails);

        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    }
}

//get all tags

exports.showAllTags = async (req,res)=>{
    try{
        const allTags = await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned Successfully",
            allTags,
        });  

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    }
};

 