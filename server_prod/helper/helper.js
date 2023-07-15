import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, REFRESH_TOKEN, SALT } from "../config/config.js";
import UserToken from "../models/userTokenModel.js";

// All Validations
export const signUpValidations = (body) => {
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label("User Name"),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
    password: Joi.string()
      .pattern(strongPasswordRegex)
      .required()
      .label("Password"),
    repeat_password: Joi.ref("password"),
  })
    .with("password", "repeat_password")
    .label("Repeat Password");

  return schema.validate(body);
};

export const logInValidations = (body) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(body);
};

// Hashing and Matching Password
export const hashingStrongPassword = async (password) => {
  const salt = await bcrypt.genSalt(Number(SALT));
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const matchingHashPassword = async (password, dbPass) => {
  const isPassword = await bcrypt.compare(password, dbPass);
  return isPassword;
};

// Generate Token For LogIn Routes
export const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });

    const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "30d" });

    const userToken = await UserToken.findOne({ userId: user._id });

    if (userToken) {
      await UserToken.deleteOne({ userId: user._id });
    }

    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

// export const updatePassValidation = async (body) => {};
