const { executeQuery } = require("../models/database");

class Product {
    getShoppingCartPage(req, res) {
        res.render("pages/shoppingcart");
    }
}

module.exports = new Product();
