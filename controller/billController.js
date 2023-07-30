const { executeQuery } = require("../models/database");

class Bill {
  async searchBill(req, res) {
    let searchbill = `select * from HOADON where MONTH(ngayDat) = ${Number(
      req.body.month
    )} `;
    res.send(await executeQuery(searchbill));
  }
}

module.exports = new Bill();
