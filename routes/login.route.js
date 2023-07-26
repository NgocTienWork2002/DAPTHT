const express = require("express");
const router = express.Router();

var loginController = require("../controller/loginController");

router.get("/", loginController.getLoginPage);
router.post("/", loginController.loginFunc);

module.exports = router;
