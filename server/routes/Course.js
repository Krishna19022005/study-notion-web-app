const express = require("express");
const router = express.Router();

//import controllers

//course controllers
const{
    createCourse,
    getAllCourses,
    getCourseDetails,
    deleteCourse,
    editCourse,
    updateCourseProgress,
    getInstructorCourses,
} = require("../controller/Course");

//category controller
const{
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controller/Category");

//section controllers
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controller/Section");

//subSectuon controllers
const{
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controller/SubSection");

//ratings controllers
const{
    createRating,
    getAverageRating,
    getAllRatingAndReviews,
} = require("../controller/RatingsAndReviews");

//Import middlewares
const {
    auth,isInstructor,
    isStudent,isAdmin,
} = require("../middleware/auth");

//Course Routes
//Only instructor can create courses

router.post('/createCourse',auth,isInstructor,createCourse);//done
router.put("/editCourse",auth,isInstructor,editCourse);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);

router.post('/addSection',auth,isInstructor,createSection);//done
router.post('/updateSection',auth,isInstructor,updateSection);//done
router.post("/deleteSection",auth,isInstructor,deleteSection);//done

router.post("/createSubSection",auth,isInstructor,createSubSection);//done
router.post('/updateSubSection',auth,isInstructor,updateSubSection);//done
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);//done

router.get("/getAllCourses",getAllCourses);//done
router.get("/getCourseDetails",getCourseDetails);//done

router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);

//Category routes
//only admin can create category

router.post("/createCategory",auth,isAdmin,createCategory);//done
router.get("/showAllCategories",showAllCategories);//done
router.get("/getCategoryPageDetails",categoryPageDetails);//done

//rating and reviews
router.post('/createRating',auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingAndReviews);

module.exports = router;