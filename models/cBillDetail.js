const { executeQuery } = require("../models/database");

module.exports = class cBillDetail {
  constructor(maHD, maSP, maDLDV, thanhTien) {
    this.maHD = maHD;
    this.maSP = maSP;
    this.maDLDV = maDLDV;
    this.thanhTien = thanhTien;
  }
  async insertBillDetail() {
    const queryString5 = `insert into CHITIETHD ( maHD ,maDLDV, thanhTien) values (${
      this.maHD
    }, ${this.maDLDV}, ${Number(this.thanhTien)})`;
    await executeQuery(queryString5);
  }
};
