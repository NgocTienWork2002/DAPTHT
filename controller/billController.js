const { executeQuery } = require("../models/database");

class Bill {
    async searchBill(req, res) {
        let searchbill = `select * from HOADON where MONTH(ngayDat) = ${Number(req.body.month)} `;
        res.send(await executeQuery(searchbill));
    }

    async getBillByUserName(req, res) {
        let queryString = `SELECT * FROM HOADON WHERE HOADON.userName = '${req.body.userName}'`;
        res.send(await executeQuery(queryString));
    }

    async getBillDetail(req, res) {
        let queryString = `SELECT * FROM HOADON WHERE HOADON.userName = '${req.body.maHD}'`;
        res.send(await executeQuery(queryString));
    }
}

module.exports = new Bill();
