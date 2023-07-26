const { executeQuery } = require("../models/database");

const getAboutPage = (req, res) => {
    res.render("pages/about");
};

module.exports = { getAboutPage };
