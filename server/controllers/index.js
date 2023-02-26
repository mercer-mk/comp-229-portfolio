let express = require("express");
const passport = require("passport");
let router = express.Router();
let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("about", {
    title: "About",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayProjectsPage = (req, res, next) => {
  res.render("projects", {
    title: "Projects",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayServicesPage = (req, res, next) => {
  res.render("services", {
    title: "Services",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};
module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};
module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // server err?
    if (err) {
      return next(err);
    }
    // is there a user login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      // server error?
      if (err) {
        return next(err);
      }

      /* TODO - Getting Ready to convert to API
      return res.json({
        success: true,
        msg: "User Logged in Successfully!",
        user: {
          id: user._id,
          displayName: user.displayName,
          username: user.username,
          email: user.email,
        },
        token: authToken,
      });*/

      return res.redirect("/contact-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.performLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
