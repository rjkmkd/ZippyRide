const express = require('express')
const router = express.Router();
const {body} = require('express-validator');
const { registerUser } = require('../controllers/user.controler.js');

router.post("/register", [
  body("email").isEmail().withMessage("Invalid Email"),
  body("fullName.firstName")
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long"),
  body("password").isLength().withMessage("password mest be at least 6 character long")
],
registerUser

);


module.exports = router;