import {
  hashedYourPassowrd,
  jwtTokenCreate,
  matchingPassword,
} from "../helper/helper.js";
import UserModel from "../models/UserModel.js";

/**
 * API: http://localhost:5000/api/auth/register
 */
export const registerUser = async (req, res) => {
  const { name, email, password, mobile, userType } = req.body;

  const isEmail = await UserModel.findOne({ email });
  const isMobile = await UserModel.findOne({ mobile });

  try {
    if (!isEmail && !isMobile) {
      const hashPassword = await hashedYourPassowrd(password);

      const newUser = await UserModel.create({
        name,
        email,
        mobile,
        profileImage: req.file.filename,
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
 * API: http://localhost:5000/api/auth/login
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const isUser = await UserModel.findOne({ email });

  try {
    if (isUser) {
      if (await matchingPassword(password, isUser.password)) {
        // @JWT token
        const token = jwtTokenCreate({ id: isUser._id, name: isUser.name });

        if (isUser.isAdmin) {
          // If you want pass any kinds of users data from DB
          return res.status(200).json({ token, isAdmin: true, success: true });
        } else {
          return res
            .status(200)
            .json({ token, isAdmin: false, success: false });
        }
      } else {
        return res.status(401).json({
          errors: [
            { msg: "Password not matched!", param: "password", success: false },
          ],
        });
      }
    } else {
      return res.status(401).json({
        errors: [
          { msg: `${email} is not found!`, param: "email", success: false },
        ],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};

/**
 * API: http://localhost:5000/api/auth//update-password
 */
export const updatePassword = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId) {
    return res.status(500).json("No User Id Found!");
  }

  const isUser = await UserModel.findOne({ _id: userId });

  try {
    if (isUser) {
      if (password) {
        const newHashPassword = await hashedYourPassowrd(password);

        const updateUserPassword = await UserModel.findByIdAndUpdate(
          { _id: isUser._id },
          {
            $set: {
              password: newHashPassword,
            },
          }
        );

        return res.status(200).json({
          errors: [
            { msg: "Password is updated!", param: "password", success: true },
          ],
        });
      } else {
        return res.status(401).json({
          errors: [
            { msg: "Password not update!", param: "password", success: false },
          ],
        });
      }
    } else {
      return res.status(401).json({
        errors: [
          { msg: `${email} is not found!`, param: "email", success: false },
        ],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json("Email Shouldn't be empty!");
  }

  const isEmail = await UserModel.findOne({ email });

  try {
    if (isEmail) {
      // Forgot password functions
      

    } else {
      return res.status(401).json({
        errors: [
          { msg: `${email} is not found!`, param: "email", success: false },
        ],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};
