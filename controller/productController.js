const { executeQuery } = require("../models/database");
const cProduct = require("../models/cProduct");

class Product {
    getShoppingCartPage(req, res) {
        res.render("pages/shoppingcart");
    }

    getShopPage(req, res) {
        res.render("pages/shop");
    }
    // <-------------------> Product <---------------->
    async getProduct(req, res) {
        const product = new cProduct();
        const data = await product.getProductList();
        res.send(data);
    }

    async updateProduct(req, res) {
        try {
            const id = req.body.id;
            const name = req.body.name;
            const price = req.body.price;
            const image = req.body.image;
            const description = req.body.description;
            const product = new cProduct();
            product.maSP = id;
            product.tenSP = name;
            product.giaTien = price;
            product.hinhAnh = image;
            product.moTa = description;
            await product.updateProduct();
            res.status(200).json({
                message: "Sucess",
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
    async addProduct(req, res) {
        try {
            const name = req.body.name;
            const price = req.body.price;
            const image = req.body.image;
            const description = req.body.description;
            const product = new cProduct();
            product.tenSP = name;
            product.giaTien = price;
            product.hinhAnh = image;
            product.moTa = description;
            await product.addProduct();
            res.status(200).json({
                message: "Sucess",
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
    async deleteProduct(req, res) {
        try {
            const id = req.body.id;
            const product = new cProduct();
            product.maSP = id;
            await product.deleteProduct();
            res.status(200).json({
                message: "Sucess",
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
            });
        }
    }

    async getDetailPage(req, res) {
        try {
            const maSP = req.params.id;
            const product = new cProduct(maSP);
            const data = await product.getProductById();
            res.render("pages/detail", { data: data });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async searchProduct(req, res) {
        try {
            let queryConfig = {
                name: req.query.name || "",
                price_min: req.query.price_min || 0,
                price_max: req.query.price_max,
            };
            const product = new cProduct();
            const data = await product.searchProduct(queryConfig.name, queryConfig.price_min, queryConfig.price_max);
            res.status(200).json({
                message: "Lấy sản phẩm thành công",
                data,
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async getCart(req, res) {
        try {
            let productList = req.body.cart;
            let idList = productList.map((item) => Number(item.id));
            let idListString = JSON.stringify(idList).replace("[", "(").replace("]", ")");
            const queryString = `SELECT * FROM  SANPHAM WHERE maSP IN ${idListString}`;
            let responseData = await executeQuery(queryString);

            let cart = responseData.map((item) => {
                let itemFind = productList.find((product) => product.id == item.maSP);
                return {
                    ...item,
                    soLuong: Number(itemFind.quantity),
                    thanhTien: Number(item.giaTien) * Number(itemFind.quantity),
                };
            });

            let totalAmount = 0;
            cart.forEach((item) => {
                totalAmount += Number(item.thanhTien);
            });

            res.status(200).json({
                message: "Lấy giỏ hàng thành công",
                data: { cart, totalAmount },
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async checkout(req, res) {
        try {
            const bill = req.body.bill;
            let queryString = `INSERT INTO HOADON(userName, tongTien, ngayDat) VALUES ('${bill.userName}', ${bill.totalAmount}, '${bill.date}')`;
            await executeQuery(queryString);
            const maHD = await executeQuery(`SELECT @@IDENTITY AS 'maHD'`);
            let listProduct = bill.cart;
            for (let i = 0; i < listProduct.length; i++) {
                let queryString1 = `INSERT INTO CHITIETHD(maHD, maSP, thanhTien, soLuong) VALUES (${maHD[0].maHD}, ${listProduct[i].maSP}, ${listProduct[i].thanhTien}, ${listProduct[i].soLuong})`;
                await executeQuery(queryString1);
            }
            res.status(200).json({
                message: "Checkout Successfully",
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
}

module.exports = new Product();
