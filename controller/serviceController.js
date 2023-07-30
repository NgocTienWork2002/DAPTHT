const { executeQuery } = require("../models/database");

class Service {
    getBookingPage(req, res) {
        res.render("pages/booking");
    }

    async getService(req, res) {
        try {
            const queryString = `select * from DICHVU where trangThai = 1`;
            const responseData = await executeQuery(queryString);
            res.status(200).json({
                message: 'Lấy dịch vụ thành công',
                data: responseData
            })
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }

    }

    async bookingService(req, res) {
        try {
            console.log(req.body);
            const { formData } = req.body
            const queryString = `insert into HOADON (userName,tongTien, ngDat) values ( '${formData.userName}', ${Number(formData.tongtien)}, '${formData.date}')`;
            await executeQuery(queryString);
            const queryString2 = `select @@IDENTITY as Mahoadon`;
            const maHD = await executeQuery(queryString2);
            console.log(maHD);
            const queryString3 = `insert into DATLICHDICHVU (maDV,ngay,gio,hoTen,soDienThoai) values (${Number(formData.id)}, '${formData.date}' , '${formData.time}', '${formData.fullName}' , '${formData.phone}')`;
            await executeQuery(queryString3);
            const queryString4 = `select @@IDENTITY as MaDLDV `;
            const MaDLDV = await executeQuery(queryString4);
            console.log(MaDLDV);
            const queryString5 = `insert into CHITIETHD ( maHD ,maDLDV, thanhTien) values (${maHD[0].Mahoadon}, ${MaDLDV[0].MaDLDV}, ${Number(formData.tongtien)})`;
            await executeQuery(queryString5);
            res.status(200).json({
                message: 'Booking Succesfully',
            })
        } catch (error) {
            res.status(500).json({
                message: "Error",
                data: error,
            });
        }
    }
}

module.exports = new Service();
