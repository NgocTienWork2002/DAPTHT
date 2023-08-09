const { executeQuery } = require("../models/database");

module.exports = class cUser {
  constructor(
    userName,
    passWord,
    hoTen,
    ngaySinh,
    diaChi,
    gioiTinh,
    soDienThoai,
    vaiTro
  ) {
    this.userName = userName;
    this.passWord = passWord;
    this.hoTen = hoTen;
    this.ngaySinh = ngaySinh;
    this.diaChi = diaChi;
    this.gioiTinh = gioiTinh;
    this.soDienThoai = soDienThoai;
    this.vaiTro = vaiTro;
  }

  async getUser() {
    const queryString = `SELECT * FROM KHACHHANG WHERE userName = '${this.userName}'`;
    const data = await executeQuery(queryString);
    return data[0];
  }

  async getUserWithPassword() {
    const queryString = `SELECT * FROM KHACHHANG WHERE userName = '${this.userName}' and passWord = '${this.passWord}'`;
    const data = await executeQuery(queryString);
    return data[0];
  }

  async insertUser() {
    const insertQueryString = `INSERT INTO KHACHHANG (userName, passWord, vaiTro) VALUES ('${this.userName}', '${this.passWord}' ,'user');`;
    await executeQuery(insertQueryString);
  }

  async updateUser() {
    const queryString = `UPDATE KHACHHANG
            SET hoTen = N'${this.hoTen}', soDienThoai= '${this.soDienThoai}', gioiTinh= '${this.gioiTinh}', ngaySinh= '${this.ngaySinh}', diaChi= N'${this.diaChi}'
            WHERE userName = '${this.userName}'`;
    await executeQuery(queryString);
  }

  deleteUser(id) {
    console.log("delete");
  }
};
