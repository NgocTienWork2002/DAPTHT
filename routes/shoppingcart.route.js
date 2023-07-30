const express = require("express");
const router = express.Router();

var productController = require("../controller/productController");

router.get("/", productController.getShoppingCartPage);
router.post("/cart", productController.getCart);
router.post("/checkout", productController.checkout);

module.exports = router;
