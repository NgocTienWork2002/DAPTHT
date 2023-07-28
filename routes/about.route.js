const express = require("express");
const router = express.Router();

var pageController = require("../controller/pageController");

router.get("/", pageController.getAboutPage);

module.exports = router;
