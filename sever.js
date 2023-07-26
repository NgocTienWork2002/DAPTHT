const express = require("express");
const app = express();
const path = require("path");
const sql = require("mssql/msnodesqlv8");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const loginRoute = require("./routes/login.route");
const homeRoute = require("./routes/home.route");
const aboutRoute = require("./routes/about.route");
const bookingRoute = require("./routes/booking.route");
const blogRoute = require("./routes/blog.route");
const contractRoute = require("./routes/contract.route");

app.use("/login", loginRoute);
app.use("/", homeRoute);
app.use("/about", aboutRoute);
app.use("/booking", bookingRoute);
app.use("/blog", blogRoute);
app.use("/contract", contractRoute);

app.listen(3000, () => {
    console.log("Sever is running");
});
