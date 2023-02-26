let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");

// create a reference to the model
let Contact = require("../models/contacts");

module.exports.displayContactList = (req, res, next) => {
  Contact.find((err, ContactList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("contacts/list", {
        title: "Contact List",
        ContactList: ContactList.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }),
        displayName: req.user ? req.user.displayName : "",
      });
      console.log(ContactList);
    }
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("contacts/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.processAddPage = (req, res, next) => {
  var newContact = Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/contact-list");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  Contact.findById(id, (err, contactToEdit) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.render("contacts/edit", {
        title: "Edit Book",
        contact: contactToEdit,
        id: id,
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedContact = Contact({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });

  Contact.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/contact-list");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.error(err);
      res.end(err);
    } else {
      res.redirect("/contact-list");
    }
  });
};
