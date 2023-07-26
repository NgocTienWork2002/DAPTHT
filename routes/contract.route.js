const express = require("express");
const router = express.Router();

var contractController = require("../controller/contractController");

router.get("/", contractController.getContractPage);

module.exports = router;
