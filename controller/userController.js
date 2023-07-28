const { executeQuery } = require("../models/database");

class userController {
    // Get page
    getLoginPage(req, res) {
        res.render("pages/login");
    }

    // Login
    async loginFunc(req, res) {
        try {
            console.log(req.body);
            const queryString = `SELECT * FROM KHACHHANG WHERE userName = '${req.body.userName}' and passWord = '${req.body.passWord}'`;
            const responseData = await executeQuery(queryString);
            if (responseData.length == 0) {
                res.status(422).json({
                    message: "Username hoặc Password không đúng",
                });
            } else {
                res.status(200).json({
                    message: "Đăng nhập thành công",
                    data: responseData[0],
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                data: error,
            });
        }
    }
}

module.exports = new userController();
