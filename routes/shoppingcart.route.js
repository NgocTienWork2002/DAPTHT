const express = require("express");
const router = express.Router();

var productController = require("../controller/productController");

router.get("/", productController.getShoppingCartPage);

module.exports = router;
