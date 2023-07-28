const express = require("express");
const router = express.Router();

var userController = require("../controller/userController");

router.get("/", userController.getLoginPage);
router.post("/", userController.loginFunc);

module.exports = router;
