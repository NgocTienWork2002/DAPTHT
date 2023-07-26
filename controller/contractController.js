const { executeQuery } = require("../models/database");

const getContractPage = (req, res) => {
    res.render("pages/contract");
};

module.exports = { getContractPage };
