const express = require("express");
const router = express.Router();

var userController = require("../controller/userController");

router.post("/", userController.signFunc);

module.exports = router;
