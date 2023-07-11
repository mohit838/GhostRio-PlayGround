import bcrypt from "bcrypt";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import multer from "multer";

const app = express();
app.use(express.static("public"));

// For Hashing Password
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
  return jsonwebtoken.sign(user, process.env.JWT_CODE, {
    expiresIn: "3hr",
  });
};

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});
export const upload = multer({ storage });
