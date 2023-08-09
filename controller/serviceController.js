const { executeQuery } = require("../models/database");
const cService = require("../models/cService");
const cBill = require("../models/cBill");
const cBooking = require("../models/cBooking");
const cBillDetail = require("../models/cBillDetail");

class Service {
  getBookingPage(req, res) {
    res.render("pages/booking");
  }
  async getServices(req, res) {
    let Service = new cService();
    const data = await Service.getListService();
    res.send(data);
  }
  async updateServices(req, res) {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    let Services = new cService(id, name, price, 1, description);
    try {
      await Services.updatecServices();
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
    let Service = new cService();
    Service.tenDV = name;
    Service.giaDV = price;
    Service.moTa = description;
    try {
      await Service.insertServices();
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
    let Service = new cService();
    Service.maDV = req.body.id;
    try {
      await Service.deleteServices();
      res.status(200).json({
        message: "Sucess",
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi",
      });
    }
  }
  async getService(req, res) {
    try {
      let Service = new cService();
      let listCombo = await Service.getServicesByStatus();
      res.status(200).json({
        message: "Lấy dịch vụ thành công",
        data: listCombo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi",
        data: error,
      });
    }
  }
  async bookingService(req, res) {
    try {
      const { formData } = req.body;
      let Service = new cBill();
      Service.userName = formData.userName;
      Service.tongTien = formData.tongtien;
      Service.ngayDat = formData.date;
      // <--------------> Insert HD <---------->
      await Service.insertBill();
      const { maHD } = await Service.insertBill();
      // <---------------> Insert Đặt Lịch Dịch Vụ <--------->
      let Booking = new cBooking();
      Booking.maDV = formData.id;
      Booking.ngay = formData.date;
      Booking.gio = formData.time;
      Booking.hoTen = formData.fullName;
      Booking.soDienThoai = formData.phone;
      await Booking.bookingServices();
      const { maDLDV } = await Booking.bookingServices();
      // <---------------> Insert Chi tiết Hóa đơn <----------------->
      let detailBill = new cBillDetail();
      detailBill.maDLDV = maDLDV;
      detailBill.maHD = maHD;
      detailBill.thanhTien = formData.tongtien;
      detailBill.insertBillDetail();
      res.status(200).json({
        message: "Booking Succesfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
}
module.exports = new Service();
