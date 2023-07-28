const { executeQuery } = require("../models/database");

class userController {
    // Get page
    getLoginPage(req, res) {
        res.render("pages/login");
    }

    // Login
    async loginFunc(req, res) {
        try {
            const responseData = await executeQuery("SELECT * FROM TaiKhoan");
            res.status(200).json({
                message: "Lấy tài khoản thành công",
                data: responseData,
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