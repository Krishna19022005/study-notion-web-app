const express = require("express");
const router = express.Router();

const{
    login,signUp,
    sendOTP,changePassword
} = require("../controller/Auth");

const{
    resetPasswordToken,resetPassword
} = require("../controller/resetPassword");

const{auth} = require("../middleware/auth");

//signup login routes
router.post('/login',login);
router.post('/signUp',signUp);
router.post('/sendOTP',sendOTP);
router.post("/changePassword",auth,changePassword);

//reset Password
router.post('/reset-password-token',resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports = router;
