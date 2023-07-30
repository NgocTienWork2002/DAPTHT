const { executeQuery } = require("../models/database");

class Product {
  getShoppingCartPage(req, res) {
    res.render("pages/shoppingcart");
  }
  // <-------------------> Product <---------------->
  async getProduct(req, res) {
    let getProduct = `Select * from SANPHAM`;
    res.send(await executeQuery(getProduct));
  }
  async updateProduct(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    try {
      let updateProduct = `UPDATE SANPHAM SET tenSP='${name}', giaTien=${Number(
        price
      )}, hinhAnh='${image}', moTa='${description}' WHERE maSP=${id}`;
      await executeQuery(updateProduct);
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
    const name = req.body.name;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    try {
      let insertProduct = `INSERT INTO SANPHAM(tenSP, moTa, giaTien,hinhAnh,trangThai) VALUES ('${name}', '${description}' ,${Number(
        price
      )},'${image}',1)`;
      executeQuery(insertProduct);
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
    const id = req.body.id;
    console.log(id);
    try {
      let deleteProduct = `UPDATE SANPHAM SET trangThai=0 WHERE maSP=${id}`;
      await executeQuery(deleteProduct);
      res.status(200).json({
        message: "Sucess",
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi",
      });
    }
  }

    getShopPage(req, res) {
        res.render("pages/shop");
    }

    async getDetailPage(req, res) {
        try {
            const id = req.params.id;
            let queryString = `SELECT * FROM SANPHAM WHERE SANPHAM.maSP = ${id}`;
            const data = await executeQuery(queryString);
            res.render("pages/detail", { data: data[0] });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async getProductList(req, res) {
        try {
            let queryConfig = {
                name: req.query.name || "",
                price_min: req.query.price_min || 0,
                price_max: req.query.price_max,
            };
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
