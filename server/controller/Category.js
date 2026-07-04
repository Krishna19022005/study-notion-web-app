const Category = require("../models/Category");
//create category handler
exports.createCategory = async (req,res)=>{
    try{
        const {name,description} = req.body;

        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All firlds are required",
            })
        }
        const categoryDetails = await Category.create({
            name:name,
            description:description
        })
        console.log(categoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
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

exports.showAllCategories = async (req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All categories returned Successfully",
            allCategories,
        });  

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
    }
};

//categoryPageDetails

exports.categoryPageDetails = async (req,res)=>{
    try{
        //get category id
        const {categoryId} = req.body;
        //get courses for specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data Not Found",
            });
        }
        //get courses for different categories
        const differentCategories  = await Category.find(
            {_id:{$ne:categoryId}}
            .populate("courses").exec()   
        )

        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
            }
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            messsage:err.message,
        });
    }
}
 