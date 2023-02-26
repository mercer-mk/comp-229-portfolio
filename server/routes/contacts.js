var express = require("express");
var router = express.Router();

let mongoose = require("mongoose");

let Contact = require("../models/contacts");
let contactsController = require("../controllers/contacts");
let passport = require("passport");

function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}
router.get("/", requireAuth, contactsController.displayContactList);

router.get("/add", requireAuth, contactsController.displayAddPage);

router.post("/add", requireAuth, contactsController.processAddPage);

router.get("/edit/:id", requireAuth, contactsController.displayEditPage);

router.post("/edit/:id", requireAuth, contactsController.processEditPage);

router.get("/delete/:id", requireAuth, contactsController.performDelete);
module.exports = router;
