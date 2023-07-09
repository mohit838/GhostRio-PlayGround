import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.static('public'));

export const hashedYourPassowrd = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const genHashPassword = await bcrypt.hash(password, salt);
    return genHashPassword;
  } catch (error) {
    return res.status(500).json('Server Inernal error!');
  }
};

// @For JWT token generation
export const jwtTokenCreate = (user) => {
  return jsonwebtoken.sign(user, process.env.JWT_CODE, {
    expiresIn: '3hr',
  });
};

// Profile Image
/* FILE STORAGE */
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/assets');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.originalname + '-' + uniqueSuffix);
//   },
// });
// const upload = multer({ storage });
