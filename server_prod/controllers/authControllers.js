import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/config.js";
import * as helper from "../helper/helper.js";
import User from "../models/UserModel.js";
import UserToken from "../models/userTokenModel.js";

// POST: http://localhost:7000/api/signup
/**{
  "username": "username",
  "email": "user4@user.com",
  "password": "Tread@1234",
  "repeat_password": "Tread@1234"
} */

export const userSignUp = async (req, res) => {
  try {
    const { error } = helper.signUpValidations(req.body);

    if (!error) {
      const isEmail = await User.findOne({ email: req.body.email });

      if (!isEmail) {
        const hashPassword = await helper.hashingStrongPassword(
          req.body.password
        );

        const createUser = await User.create({
          ...req.body,
          password: hashPassword,
        });

        // Creating Access and Refresh Token
        const { accessToken, refreshToken } = await helper.generateTokens(
          createUser
        );

        res.status(201).json({
          success: true,
          msg: "User Created Successfully!!",
          data: [
            {
              id: createUser._id,
              name: createUser.username,
              email: createUser.email,
              roles: createUser.roles,
            },
          ],
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(302).json({
          success: false,
          msg: "Email Already Exists!!",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        msg: error?.details[0]?.message,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "NS In Problem!!",
      catch: e,
    });
  }
};

// POST: http://localhost:7000/api/login
/**{
  "email": "user4@user.com",
  "password": "Tread@1234"
} */
export const userLogIn = async (req, res) => {
  try {
    const { error } = helper.logInValidations(req.body);

    if (!error) {
      const isUser = await User.findOne({ email: req.body.email });

      if (isUser) {
        const matchingPassword = await helper.matchingHashPassword(
          req.body.password,
          isUser.password
        );

        if (matchingPassword) {
          // Creating Access and Refresh Token
          const { accessToken, refreshToken } = await helper.generateTokens(
            isUser
          );

          res.status(201).json({
            success: true,
            msg: "LogIn Successfully!!",
            data: [
              {
                id: isUser._id,
                name: isUser.username,
                email: isUser.email,
                roles: isUser.roles,
              },
            ],
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res.status(401).json({
            success: false,
            msg: "Password Doesn't Match!!",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          msg: "Have No Account Exists!!",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        msg: error?.details[0]?.message,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "NS In Problem!!",
      catch: e,
    });
  }
};

// POST: http://localhost:7000/api/refresh-token
/**{
  "Authorization": "old-refresh-token"
} */
export const refreshToken = async (req, res) => {
  try {
    const { error } = helper.refreshTokenValidation(req.body);

    if (!error) {
      helper
        .verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
          const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
          const accessToken = jwt.sign(payload, ACCESS_TOKEN, {
            expiresIn: "15m",
          });

          res.status(201).json({
            success: true,
            accessToken,
            msg: "Access token created successfully",
          });
        })
        .catch((err) =>
          res.status(400).json({
            success: false,
            msg: err,
          })
        );
    } else {
      return res
        .status(400)
        .json({ success: false, msg: error.details[0].message });
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error!!", catch: e });
  }
};

// POST: http://localhost:7000/api/logout
/**{
  "Authorization": "remove-token"
} */
export const logOutUser = async (req, res) => {
  try {
    const { error } = helper.refreshTokenValidation(req.body);
    if (!error) {
      const userToken = await UserToken.findOne({token: req.body.refreshToken});
      if (!userToken) {
        return res
            .status(200)
            .json({success: true, msg: "Logged Out Successfully!!"});
      }
      await UserToken.deleteOne({token: req.body.refreshToken});
      return res
          .status(200)
          .json({success: true, msg: "Logged Out Successfully!!"});
    } else {
      return res
          .status(400)
          .json({success: false, msg: error.details[0].message});
    }
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, msg: "NS In Problem!!", catch: e });
  }
};
