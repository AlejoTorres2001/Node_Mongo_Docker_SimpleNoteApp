const express = require("express");
const { route } = require(".");
const router = express.Router();
const User = require("../models/User");
const passport = require("passport");
require("../models/User");
router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});

router.post(
  "/users/signin",
  passport.authenticate("local", {
    successRedirect: "/notes/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
  })
);
router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});
router.post("/users/signup", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const errors = [];
  if (JSON.stringify(req.body.name).length == 2) {
    errors.push({ text: "insert a name" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password dont match" });
  }
  if (JSON.stringify(req.body.password).length <= 5) {
    errors.push({ text: "Password must be at least 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const email_usr = await User.findOne({ email: email });
    if (email_usr) {
      req.flash("error_msg", "You are already registered");
      res.redirect("/users/signup");
    }
    const NewUser = new User({ name, email, password });
    NewUser.password = await NewUser.encryptPassword(password);
    await NewUser.save();
    req.flash("success_msg", "You are registered");
    res.redirect("/users/signin");
  }
});
router.get("/users/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
