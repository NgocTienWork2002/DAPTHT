const express = require("express");
const router = express.Router();

var productController = require("../controller/productController");

router.get("/", productController.getShopPage);
router.get("/products", productController.getProductList);

module.exports = router;
