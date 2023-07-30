const { executeQuery } = require("../models/database");

class Service {
  getBookingPage(req, res) {
    res.render("pages/booking");
  }
  async getServices(req, res) {
    let getServices = `Select * FROM DICHVU`;
    res.send(await executeQuery(getServices));
  }
  async updateServices(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    try {
      let updateService = `UPDATE DICHVU SET tenDV='${name}', giaDV=${Number(
        price
      )},moTa='${description}',trangThai=1 WHERE maDV=${id}`;
      await executeQuery(updateService);
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
  async insertServices(req, res) {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    try {
      let insertServices = `INSERT INTO DICHVU(tenDV, giaDV, trangThai, moTa) VALUES ('${name}', ${Number(
        price
      )},1,'${description}')`;
      executeQuery(insertServices);
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
  async deleteServices(req, res) {
    try {
      let deleteservices = `UPDATE DICHVU SET trangThai=0 WHERE maDV=${Number(
        req.body.id
      )}`;
      await executeQuery(deleteservices);
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

module.exports = new Service();
