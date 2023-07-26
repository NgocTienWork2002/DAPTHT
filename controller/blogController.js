const { executeQuery } = require("../models/database");

const getBlogPage = (req, res) => {
    res.render("pages/blog");
};

module.exports = { getBlogPage };
