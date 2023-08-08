const express = require("express");
const router = express.Router();

var productController = require("../controller/productController");

router.get("/", productController.getShopPage);
router.get("/products", productController.searchProduct);
router.get("/:id", productController.getDetailPage);

module.exports = router;
