const express = require("express");
const router = express.Router();

var bookingController = require("../controller/bookingController");

router.get("/", bookingController.getBookingPage);

module.exports = router;
