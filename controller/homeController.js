const { executeQuery } = require("../models/database");

const getHomePage = (req, res) => {
    res.render("pages/home");
};

module.exports = { getHomePage };
