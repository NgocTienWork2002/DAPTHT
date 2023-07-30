const express = require("express");
const router = express.Router();

var serviceController = require("../controller/serviceController");

router.get("/", serviceController.getBookingPage);
router.get("/service", serviceController.getService);
router.post("/", serviceController.bookingService);

module.exports = router;
