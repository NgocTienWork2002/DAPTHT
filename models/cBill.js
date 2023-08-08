const { executeQuery } = require("../models/database");

module.exports = class cBill {
    constructor(userName, maHD, tongTien, ngayDat) {
        this.userName = userName;
        this.maHD = maHD;
        this.tongTien = tongTien;
        this.ngayDat = ngayDat;
    }
    async insertBill() {
        const queryString = `insert into HOADON (userName, tongTien, ngayDat) values ( '${this.userName}', ${this.tongTien}, '${this.ngayDat}')`;
        await executeQuery(queryString);
        const queryString2 = `select @@IDENTITY as maHD`;
        const data = await executeQuery(queryString2);
        return data[0];
    }
};
