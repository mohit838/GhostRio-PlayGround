import { body } from "express-validator";

// @For Registration only
export const registerValidations = [
  body("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Name Is Required!!"),

  body("email")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .withMessage("Email Is Required!!"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password Should be 8 Character long!"),
];

// @For Login only
export const loginValidations = [
  body("email")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail()
    .withMessage("Email Is Required!!"),

  body("password").not().isEmpty().withMessage("Password Is Required!!"),
];
