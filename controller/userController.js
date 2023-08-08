const { executeQuery } = require("../models/database");

const cUser = require("../models/cUser");

class userController {
    // Get page
    getLoginPage(req, res) {
        res.render("pages/login");
    }

    getProfilePage(req, res) {
        res.render("pages/profile");
    }

    //Sinup
    async signFunc(req, res) {
        try {
            const user = new cUser(req.body.signU, req.body.signP);
            const responseData = await user.getUser();
            if (responseData) {
                res.status(422).json({
                    message: "Tài khoản đã tồn tại",
                });
            } else {
                await user.insertUser();
                const userData = await user.getUser();
                res.status(200).json({
                    message: "Đăng ký tài khoản thành công",
                    data: userData,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
    // Login
    async loginFunc(req, res) {
        try {
            const user = new cUser(req.body.userName, req.body.passWord);
            const responseData = await user.getUserWithPassword();
            if (!responseData) {
                res.status(422).json({
                    message: "Username hoặc Password không đúng",
                });
            } else {
                res.status(200).json({
                    message: "Đăng nhập thành công",
                    data: responseData,
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async getInfoUser(req, res) {
        try {
            const user = new cUser(req.body.userName);
            const responseData = await user.getUser();
            console.log(responseData);
            res.status(200).json({
                message: "Lấy thông tin thành công",
                data: responseData,
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }

    async updateInfoUser(req, res) {
        try {
            const { userName, fullName, phone, address, gender, date } = req.body;
            const user = new cUser();
            user.userName = userName;
            user.hoTen = fullName;
            user.soDienThoai = phone;
            user.diaChi = address;
            user.gioiTinh = gender;
            user.ngaySinh = date;
            await user.updateUser();
            const userInfo = await user.getUser();
            res.status(200).json({
                message: "Update successfully",
                data: userInfo,
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
}

module.exports = new userController();
