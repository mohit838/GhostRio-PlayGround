import {
  genJwtToken,
  hashPassword,
  loginBodyValidations,
  matchingPassword,
  registrationBodyValidations,
} from "../helper/helper.js";
import UserModel from "../models/UserModel.js";

/**
 * API: http://localhost:7000/api/auth/register
 */
export const registerUser = async (req, res) => {
  try {
    const { error } = registrationBodyValidations(req.body);

    if (!error) {
      // Check User exists OR not
      const checkUser = await UserModel.findOne({ email });

      // If user exists
      if (!checkUser) {
        // Hash password
        const encPassword = await hashPassword(password);

        // Create New User
        const newUser = await UserModel.create({
          ...req.body,
          password: encPassword,
        });

        // Gen Access and refresh token
        const { genAccessToken, genRefreshToken } = await genJwtToken(newUser);

        // Send user data as response
        res.status(201).json({
          errors: [
            {
              success: true,
              msg: "User Created Successfully!!",
              param: "user",
              data: newUser,
              genAccessToken,
              genRefreshToken,
            },
          ],
        });
      } else {
        res.status(400).json({
          errors: [
            {
              success: false,
              msg: "User Email Already Exists!!",
              param: "email",
            },
          ],
        });
      }
    } else {
      res.status(400).json({
        errors: [
          {
            success: false,
            msg: error.details[0].message,
            param: "data",
          },
        ],
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: [
        { success: false, msg: "Internal Server Error!!", param: "Server" },
      ],
    });
  }
};

/**
 * API: http://localhost:7000/api/auth/login
 */
export const logInUser = async (req, res) => {
  try {
    const { error } = loginBodyValidations(req.body);

    const { password } = req.body;

    if (!error) {
      // Check user has email or not in db
      const checkUser = await UserModel.findOne({ email });

      // If has the user
      if (checkUser) {
        // verifying the password from body
        const verifyPassword = await matchingPassword(
          password,
          checkUser.password
        );

        // If verify successfully then
        if (verifyPassword) {
          // Gen Access and refresh token
          const { genAccessToken, genRefreshToken } = await genJwtToken(
            checkUser
          );

          res.status(200).json({
            errors: [
              {
                success: true,
                msg: "Login Successfully!!",
                param: "login",
                genAccessToken,
                genRefreshToken,
              },
            ],
          });
        } else {
          res.status(200).json({
            errors: [
              {
                success: false,
                msg: "Pasword doesn't match!!",
                param: "password",
              },
            ],
          });
        }
      } else {
        res.status(404).json({
          errors: [
            {
              success: false,
              msg: "User Email Not Found!!",
              param: "email",
            },
          ],
        });
      }
    } else {
      res.status(400).json({
        errors: [
          {
            success: false,
            msg: "Enter Valid Data In Registration Form.",
            param: "data",
          },
        ],
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: [
        { success: false, msg: "Internal Server Error!!", param: "Server" },
      ],
    });
  }
};
