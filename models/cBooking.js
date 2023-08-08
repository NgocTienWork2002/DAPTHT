const { executeQuery } = require("../models/database");

module.exports = class cBooking {
    constructor(maDLDV, maDV, ngay, gio, hoTen, soDienThoai) {
        this.maDLDV = maDLDV;
        this.maDV = maDV;
        this.ngay = ngay;
        this.gio = gio;
        this.hoTen = hoTen;
        this.soDienThoai = soDienThoai;
    }
    async bookingServices() {
        const queryString3 = `insert into DATLICHDICHVU (maDV,ngay,gio,hoTen,soDienThoai) values (${Number(this.maDV)}, '${this.ngay}' , '${
            this.gio
        }', '${this.hoTen}' , '${this.soDienThoai}')`;
        await executeQuery(queryString3);
        const queryString4 = `select @@IDENTITY as maDLDV `;
        const data = await executeQuery(queryString4);
        return data[0];
    }
};
