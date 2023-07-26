const express = require("express");
const router = express.Router();

var homeController = require("../controller/homeController");

router.get("/", homeController.getHomePage);

module.exports = router;
