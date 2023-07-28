const express = require("express");
const router = express.Router();

var serviceController = require("../controller/serviceController");

router.get("/", serviceController.getBookingPage);

module.exports = router;
