import randomstring from "randomstring";
import {
  hashedYourPassowrd,
  jwtTokenCreate,
  matchingPassword,
  reNewToken,
  resetPasswordMail,
} from "../helper/helper.js";
import UserModel from "../models/UserModel.js";

/**
 * API: http://localhost:5000/api/auth/register
 */
export const registerUser = async (req, res) => {
  const { name, email, password, mobile, isVendor, isAdmin } = req.body;

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
        password: hashPassword,
        isVendor,
        isAdmin,
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
 * API: http://localhost:5000/api/auth/update-password
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
          isUser._id,
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

/**
 * API: http://localhost:5000/api/auth/forgot-password
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).json("Email Shouldn't be empty!");
  }

  const isEmail = await UserModel.findOne({ email });

  try {
    if (isEmail) {
      // Forgot password functions
      const randomStringValue = randomstring.generate();

      const updateToken = await UserModel.updateOne(
        { email },
        { $set: { isToken: randomStringValue } }
      );

      const sendingMail = resetPasswordMail(
        isEmail.name,
        isEmail.email,
        randomStringValue
      );

      return res.status(200).json({
        errors: [
          {
            msg: "Check Your Email For Details!",
            param: "password",
            success: true,
          },
        ],
      });
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
 * API: http://localhost:5000/api/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token || token === null) {
    return res.status(404).json("Invalid Token!");
  }

  try {
    if (token) {
      // Reset Password Code
      const checkToken = await UserModel.findOne({ isToken: token });

      if (checkToken) {
        const hashGetNewPass = await hashedYourPassowrd(password);

        const resetPasswordField = await UserModel.findByIdAndUpdate(
          checkToken._id,
          { $set: { password: hashGetNewPass, isToken: "" } },
          { new: true }
        );

        return res.status(200).json({
          errors: [
            {
              msg: "Password change successfully!",
              param: "password",
              success: true,
            },
          ],
        });
      } else {
        return res.status(404).json({
          errors: [{ msg: `Link Expired!`, param: "email", success: false }],
        });
      }
    } else {
      return res.status(404).json({
        errors: [{ msg: `Link Expired!`, param: "email", success: false }],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};

/**
 * API: http://localhost:5000/api/auth/refresh-token
 */
export const refreshToken = async (req, res) => {
  try {
    const { userId } = req.body;

    const isUserData = await UserModel.findOne({ _id: userId });

    if (isUserData) {
      const generateRefreshToken = await reNewToken(userId);

      const response = {
        userId,
        token: generateRefreshToken,
      };
      return res.status(200).json({
        errors: [
          {
            msg: `refresh tokens!`,
            param: "refesh",
            success: true,
            data: response,
          },
        ],
      });
    } else {
      return res.status(404).json({
        errors: [{ msg: `Expired!`, param: "refesh", success: false }],
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server Inernal error!");
  }
};
