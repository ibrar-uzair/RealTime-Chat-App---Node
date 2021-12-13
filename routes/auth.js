const express = require("express");
const { body } = require("express-validator");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.displayLoginPage);

router.post("/login", authController.postLogin);

router.get("/signup", authController.displaySignupPage);

router.post(
  "/signup",
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email address already exist");
        }
      });
    })
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 4, max: 16 })
    .withMessage("Password must be between 4 to 16 characters")
    .custom(async (password, { req }) => {
      const confirmPassword = req.body.confirmPassword;
      if (password !== confirmPassword) {
        throw new Error("Passwords must be same");
      }
    }),
  body("username").trim().not().isEmpty(),
  authController.postSignup
);

module.exports = router;
