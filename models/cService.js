const { executeQuery } = require("../models/database");

module.exports = class cService {
    constructor(maDV, tenDV, giaDV, trangThai, moTa) {
        this.maDV = maDV;
        this.tenDV = tenDV;
        this.giaDV = giaDV;
        this.trangThai = trangThai;
        this.moTa = moTa;
    }
    async getListService() {
        let queryString = `Select * FROM DICHVU`;
        const data = await executeQuery(queryString);
        return data;
    }
    async getServicesByStatus() {
        let queryString = `select * from DICHVU where trangThai = 1`;
        let responseData = await executeQuery(queryString);
        return responseData;
    }
    async updatecServices() {
        let updateService = `UPDATE DICHVU SET tenDV=N'${this.tenDV}', giaDV=${Number(this.giaDV)},moTa= N'${
            this.moTa
        }',trangThai=1 WHERE maDV=${this.maDV}`;
        await executeQuery(updateService);
    }
    async insertServices() {
        let insertServices = `INSERT INTO DICHVU(tenDV, giaDV, trangThai, moTa) VALUES ('${this.tenDV}', ${Number(this.giaDV)},1,'${
            this.moTa
        }')`;
        await executeQuery(insertServices);
    }
    async deleteServices() {
        let deleteservices = `UPDATE DICHVU SET trangThai=0 WHERE maDV=${Number(this.maDV)}`;
        await executeQuery(deleteservices);
    }
};
