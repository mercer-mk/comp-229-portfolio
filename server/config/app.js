/*app.js
 Milankumar Chhaganbhai Khunt
301245415
26/02/2023
*/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStategy = passportLocal.Strategy;
let flash = require("connect-flash");

//databse setup

let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to the uri
mongoose.connect(DB.URI, { useNewUrlParser: true, useUnifiedTopology: true });
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));

mongoDB.once("open", () => {
  console.log("Connected to MongoDB...");
});
var indexRouter = require("../routes/index");
var usersRouter = require("../routes/users");
var contactsRouter = require("../routes/contacts");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

let userModel = require("../models/user.js");
let User = userModel.User;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/contact-list", contactsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

module.exports = app;
