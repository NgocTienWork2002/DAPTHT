const { executeQuery } = require("../models/database");

class Service {
    getBookingPage(req, res) {
        res.render("pages/booking");
    }
}

module.exports = new Service();
