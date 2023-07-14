import bcrypt from "bcrypt";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN, SALT } from "../config/envConfig.js";
import UserToken from "../models/UserToken.js";

// Registration Body Validations
export const registrationBodyValidations = (body) => {
  const complexityOptions = {
    min: 8,
    max: 64,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  };

  const schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    password: passwordComplexity(complexityOptions)
      .required()
      .label("Password"),
    email: Joi.string().required().label("Email"),
  });

  return schema.validate(body);
};

// Login Body Validations
export const loginBodyValidations = (body) => {
  const schema = Joi.object({
    password: Joi.string().required().label("Password"),
    email: Joi.string().required().label("Email"),
  });

  return schema.validate(body);
};

// Hashing Password
export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT);
    const genHashPassword = await bcrypt.hash(password, salt);
    return genHashPassword;
  } catch (error) {
    res.status(500).json({
      errors: [
        { success: false, msg: "Internal Server Error!!", param: "Server" },
      ],
    });
  }
};

// Matching Password
export const matchingPassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

// Generate Access Token and Refresh Token
export const genJwtToken = async (user) => {
  try {
    const userData = { _id: user._id, roles: user.roles };
    // Generate Access Token
    const genAccessToken = await jwt.sign(userData, ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    // Generate Refresh Token
    const genRefreshToken = await jwt.sign(userData, REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    // Find usertoken in usertoken model
    const findUserToken = await UserToken.findOne({ userId: user._id });

    // Then remove token first if exists in db
    if (findUserToken) await UserToken.remove(findUserToken);

    // If not any token in db then create one with refresh token
    const newRefreshToken = await UserToken.create({
      userId: user._id,
      token: genRefreshToken,
    });

    return Promise.resolve({ genAccessToken, genRefreshToken });
  } catch (error) {
    res.status(500).json({
      errors: [
        { success: false, msg: "Internal Server Error!!", param: "Server" },
      ],
    });
  }
};
