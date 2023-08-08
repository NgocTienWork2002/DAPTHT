const express = require("express");
const app = express();
const path = require("path");
const sql = require("mssql/msnodesqlv8");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoute = require("./routes/auth.route");
const homeRoute = require("./routes/home.route");
const aboutRoute = require("./routes/about.route");
const bookingRoute = require("./routes/booking.route");
const blogRoute = require("./routes/blog.route");
const contractRoute = require("./routes/contract.route");
const shoppingcartRoute = require("./routes/shoppingcart.route");
const managementRoute = require("./routes/management.route");
const signUpRoute = require("./routes/sign.route");
const shopRoute = require("./routes/shop.route");
const profileRoute = require("./routes/profile.route");

app.use("/login", authRoute);
app.use("/sign", signUpRoute);
app.use("/", homeRoute);
app.use("/about", aboutRoute);
app.use("/booking", bookingRoute);
app.use("/blog", blogRoute);
app.use("/contract", contractRoute);
app.use("/shoppingcart", shoppingcartRoute);
app.use("/management", managementRoute);
app.use("/shop", shopRoute);
app.use("/profile", profileRoute);

app.listen(3000, () => {
    console.log("Sever is running");
});
