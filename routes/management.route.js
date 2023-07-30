const express = require("express");
const router = express.Router();
const pageController = require("../controller/pageController");
const productController = require("../controller/productController");
const serviceController = require("../controller/serviceController");
const billController = require("../controller/billController");

router.get("/", pageController.getManagementPage);
router.get("/getproduct", productController.getProduct);
router.get("/getservices", serviceController.getServices);
router.post("/insert", productController.addProduct);
router.post("/insertservices", serviceController.insertServices);
router.post("/update", productController.updateProduct);
router.post("/updateservices", serviceController.updateServices);
router.post("/delete", productController.deleteProduct);
router.post("/deleteservices", serviceController.deleteServices);
router.post("/searchbill", billController.searchBill);

module.exports = router;
