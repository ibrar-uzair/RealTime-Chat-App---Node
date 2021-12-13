const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.displayLoginPage = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message = message[0];
  } else {
    message = null;
  }
  res.render("./auth/login.ejs", { errorMessage: message });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email);
  console.log(password);
  var isLoggedIn = false;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password");
        return res.redirect("/login");
      }
      bcrypt.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          console.log("Password Matched");
          req.session.isLoggedIn = true;
          req.session.user = user;
          console.log("Matched");
          return req.session.save((err) => {
            console.log(err);
            res.redirect("/");
          });
        }
        console.log("Password didn't match");
        res.redirect("/login");
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.displaySignupPage = (req, res, next) => {
  res.render("./auth/signup.ejs", {});
};

exports.postSignup = (req, res, next) => {
  console.log("Came in post Signup");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation failed");
    console.log(errors);
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const phone = req.body.phone;
  console.log(email);
  console.log(password);
  console.log(username);
  console.log(phone);
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        return res.redirect("/login");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashPassword) => {
          const user = new User({
            email: email,
            password: hashPassword,
            imageUrl: "",
            username: username,
            phoneNo: phone,
          });
          console.log("User added successfully");
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
        })
        .catch((err) => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
        });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
  res.redirect("/login");
};
