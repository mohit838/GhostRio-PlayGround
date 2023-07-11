import {
  hashedYourPassowrd,
  jwtTokenCreate,
  matchingPassword,
} from "../helper/helper.js";
import UserModel from "../models/UserModel.js";

/**
 * API: http://localhost:5000/api/register
 */

export const registerUser = async (req, res) => {
  // TODO: User Email, Moblie Validation Needed
  const { name, mobile, userType, email, password } = req.body;

  const isEmail = await UserModel.findOne({ email });
  const isMobile = await UserModel.findOne({ mobile });

  try {
    if (!isEmail && !isMobile) {
      const hashPassword = await hashedYourPassowrd(password);

      const newUser = await UserModel.create({
        name,
        email,
        mobile,
        image: req.file.filename,
        userType,
        password: hashPassword,
      });
      // @JWT token
      const token = jwtTokenCreate({ id: newUser._id, name: newUser.name });

      return res
        .status(201)
        .json({ success: true, msg: "You account has been created.", token });
    } else {
      return res.status(401).json({
        success: false,
        msg: `${email} OR ${mobile} is already taken!`,
        param: "email",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

/**
 * API: http://localhost:5000/api/login
 */
export const loginUser = async (req, res) => {
  // TODO: User Email, Password Validation Needed
  const { email, password } = req.body;

  const isUser = await UserModel.findOne({ email });

  try {
    if (isUser) {
      if (await matchingPassword(password, isUser.password)) {
        // @JWT token
        const token = jwtTokenCreate({ id: isUser._id, name: isUser.name });

        if (isUser.userType) {
          return res.status(200).json({ token, userType: true });
        } else {
          return res.status(200).json({ token, userType: false });
        }
      } else {
        return res.status(401).json({
          errors: [{ msg: "Password not matched!", param: "password" }],
        });
      }
    } else {
      return res.status(401).json({
        errors: [{ msg: `${email} is not found!`, param: "email" }],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};
