const express = require("express");
const router = express.Router();

var blogController = require("../controller/blogController");

router.get("/", blogController.getBlogPage);

module.exports = router;
