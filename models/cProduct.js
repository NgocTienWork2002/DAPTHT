const { executeQuery } = require("../models/database");

module.exports = class Product {
    constructor(maSP, tenSP, moTa, giaTien, hinhAnh, trangThai) {
        this.maSP = maSP;
        this.tenSP = tenSP;
        this.moTa = moTa;
        this.giaTien = giaTien;
        this.hinhAnh = hinhAnh;
        this.trangThai = trangThai;
    }

    async getProductList() {
        const queryString = `Select * from SANPHAM`;
        const data = await executeQuery(queryString);
        return data;
    }

    async getProductById() {
        let queryString = `SELECT * FROM SANPHAM WHERE SANPHAM.maSP = ${this.maSP}`;
        const data = await executeQuery(queryString);
        return data[0];
    }

    async searchProduct(name, price_min, price_max) {
        let queryString = `SELECT * FROM SANPHAM WHERE tenSP like '%${name}%' and giaTien >= ${price_min} and trangThai = 1`;
        if (price_max) {
            queryString = `SELECT * FROM SANPHAM WHERE tenSP like '%${name}%' and giaTien >= ${price_min} and giaTien <= ${price_max} and trangThai = 1`;
        }
        const data = await executeQuery(queryString);
        return data;
    }

    async addProduct() {
        let queryString = `INSERT INTO SANPHAM(tenSP, moTa, giaTien,hinhAnh,trangThai) VALUES ('${this.tenSP}', '${this.moTa}' ,${Number(
            this.giaTien
        )},'${this.hinhAnh}',1)`;
        await executeQuery(queryString);
    }

    async deleteProduct() {
        let queryString = `UPDATE SANPHAM SET trangThai=0 WHERE maSP=${this.maSP}`;
        await executeQuery(queryString);
    }

    async updateProduct() {
        let queryString = `UPDATE SANPHAM SET tenSP='${this.tenSP}', giaTien=${Number(this.giaTien)}, hinhAnh='${this.hinhAnh}', moTa='${
            this.moTa
        }' WHERE maSP=${this.maSP}`;
        await executeQuery(queryString);
    }
};
