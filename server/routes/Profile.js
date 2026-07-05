const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth");

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
} = require("../controller/Profile");

//profile routes

router.delete("/deleteProfile",auth,deleteAccount);
router.put("/updateProfile",auth,updateProfile);
router.get('/getUserDetails',auth,getAllUserDetails);

//get Enrolled courses
router.get("/enrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports = router;