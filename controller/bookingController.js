const { executeQuery } = require("../models/database");

const getBookingPage = (req, res) => {
    res.render("pages/booking");
};

module.exports = { getBookingPage };
