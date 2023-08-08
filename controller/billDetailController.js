const { executeQuery } = require("../models/database");
const cBill = require("../models/Bill");
class BillDetail {
    constructor(maHD, maSP, maDLDV, thanhTien) {
        this.maHD = maHD;
        this.maSP = maSP;
        this.maDLDV = maDLDV;
        this.thanhTien = thanhTien;
    }
    async insertBillDetail() {}
}
module.exports = new BillDetail();
