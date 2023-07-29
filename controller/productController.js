const { executeQuery } = require("../models/database");

class Product {
    getShoppingCartPage(req, res) {
        res.render("pages/shoppingcart");
    }

    getShopPage(req, res) {
        res.render("pages/shop");
    }

    async getProductList(req, res) {
        let queryConfig = {
            name: req.query.name || "",
            price_min: req.query.price_min || 0,
            price_max: req.query.price_max,
        };
        console.log(queryConfig);
        let queryString = `SELECT * FROM SANPHAM WHERE tenSP like '%${queryConfig.name}%' and giaTien >= ${queryConfig.price_min}`;
        if (queryConfig.price_max) {
            console.log("truonghop");
            queryString = `SELECT * FROM SANPHAM WHERE tenSP like '%${queryConfig.name}%' and giaTien >= ${queryConfig.price_min} and giaTien <= ${queryConfig.price_max}`;
        }

        const data = await executeQuery(queryString);
        res.status(200).json({
            message: "Lấy sản phẩm thành công",
            data,
        });
    }
}

module.exports = new Product();
