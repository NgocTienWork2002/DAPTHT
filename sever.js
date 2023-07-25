var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var sql = require("mssql/msnodesqlv8");
var cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

var homeRouter = require("./routes/home.route");
var shoppingcartRouter = require("./routes/shoppingcart.route");
var userRouter = require("./routes/user.route");
var ContractRouter = require("./routes/contract.route");
var LoginRouter = require("./routes/login.route");
var ShopRouter = require("./routes/shop.route");
var ManageRouter = require("./routes/manage.route");
var aboutRouter = require("./routes/about.route");
var CustomerRouter = require("./routes/customer.route");
var AccountRouter = require("./routes/account.route");
var ChatRouter = require("./routes/chat.route");
var SumarryRouter = require("./routes/sumary.route");

app.use("/Contract", ContractRouter);
app.use("/Login", LoginRouter);
app.use("/Shopping", ShopRouter);
app.use("/Manage", ManageRouter);
app.use("/home", homeRouter);
app.use("/shoppingcart", shoppingcartRouter);
app.use("/user", userRouter);
app.use("/about", aboutRouter);
app.use("/Customer", CustomerRouter);
app.use("/Account", AccountRouter);
app.use("/Chat", ChatRouter);
app.use("/Sumarry", SumarryRouter);

sever = app.listen(3000, () => {
  console.log("sever is running");
});
