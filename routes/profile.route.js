const express = require("express");
const router = express.Router();

var userController = require("../controller/userController");

router.get("/", userController.getProfilePage);
router.post("/info", userController.getInfoUser);
router.post("/update", userController.updateInfoUser);

module.exports = router;
