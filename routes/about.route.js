const express = require("express");
const router = express.Router();

var aboutController = require("../controller/aboutController");

router.get("/", aboutController.getAboutPage);

module.exports = router;
