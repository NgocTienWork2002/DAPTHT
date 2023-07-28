const { executeQuery } = require("../models/database");

const getAboutPage = (req, res) => {
    res.render("pages/about");
};

const getBlogPage = (req, res) => {
    res.render("pages/blog");
};

const getHomePage = (req, res) => {
    res.render("pages/home");
};

const getContractPage = (req, res) => {
    res.render("pages/contract");
};

module.exports = { getAboutPage, getBlogPage, getHomePage, getContractPage };
