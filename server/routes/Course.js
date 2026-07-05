const express = require("express");
const router = express.Router();

//import controllers

//course controllers
const{
    createCourse,
    getAllCourses,
    getCourseDetails,
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

router.post('/createCourse',auth,isInstructor,createCourse);

router.post('/addSection',auth,isInstructor,createSection);
router.post('/updateSection',auth,isInstructor,updateSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);

router.post("/createSubSection",auth,isInstructor,createSubSection);
router.post('/updateSubSection',auth,isInstructor,updateSubSection);
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

router.get("/getAllCourses",getAllCourses);
router.get("/getCourseDetails",getCourseDetails);

//Category routes
//only admin can create category

router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.get("/getCategoryPageDetails",categoryPageDetails);

//rating and reviews
router.get('/createRating',auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRatingAndReviews);

module.exports = router;