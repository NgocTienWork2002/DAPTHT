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
}

module.exports = new Product();
