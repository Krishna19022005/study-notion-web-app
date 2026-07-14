const express = require("express");
const router = express.Router();

const {ContactUs} = require("../controller/Contact");

router.post("/contact",ContactUs);

module.exports = router;