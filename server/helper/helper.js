import bcrypt from "bcrypt";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";
import nodemailer from "nodemailer";
import { BACKEND, EMAIL, JWT_CODE, PASSWORD } from "../config/envConfig.js";

const app = express();
app.use(express.static("public"));

//@For Hashing Password
export const hashedYourPassowrd = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const genHashPassword = await bcrypt.hash(password, salt);
    return genHashPassword;
  } catch (error) {
    return res.status(500).json("Server Inernal error!");
  }
};

// @For Matching password
export const matchingPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

// @For JWT token generation
export const jwtTokenCreate = (user) => {
  return jsonwebtoken.sign(user, JWT_CODE, {
    expiresIn: "3hr",
  });
};

//@FOR Profile Image STORAGE
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/profile_image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
export const profileImageUpload = multer({ storage: profileStorage });

//@FOR Store Image STORAGE
const storeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/store_image");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
export const storeImageUpload = multer({ storage: storeStorage });

//@FOR MAIL GENERATORS
export const resetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const mailBody = {
      from: EMAIL,
      to: email,
      subject: "Your Reset Password Confirmation Mail",
      html: `<p>Hi ${name}, </br> Here is your reset password link <a href="${BACKEND}api/auth/reset-password?token=${token}">Reset Password</a></p>`,
    };

    transporter.sendMail(mailBody, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail has been sent!!", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};

("http://localhost:5000/api/auth/reset-password?token=${token}");
