import bcrypt from "bcrypt";
import { SALT } from "../config/envConfig.js";
import User from "../models/UserModel.js";
import UserToken from "../models/UserTokenModel.js";
import generateTokens from "../utils/generateTokens.js";
import * as validations from "../utils/validationSchema.js";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

/**
 * @param {POST: http://localhost:7000/api/auth/view/register} req
 * @param {"userName":"usernaemds","email":"user@gmail.com","password":"User@!123"} req.body
 * @param {error: false, message: "Account created sucessfully!!"} res
 * @returns
 */

export const registerUser = async (req, res) => {
  try {
    const { error } = validations.signUpBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .json({ error: true, message: "User with given email already exist" });

    // TODO:: Move to utils
    const salt = await bcrypt.genSalt(Number(SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const createNewUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).json({
      error: false,
      message: "Account created sucessfully!!",
      userData: [
        {
          name: createNewUser.userName,
          email: createNewUser.email,
          roles: createNewUser.roles,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

/**
 * @param {POST: http://localhost:7000/api/auth/view/login} req
 * @param {"email":"user@gmail.com","password":"User@!123"} req.body
 * @param {error: false, message: "Logged in sucessfully!"} res
 * @returns
 */

export const logInUser = async (req, res) => {
  try {
    const { error } = validations.logInBodyValidation(req.body);

    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password!!" });

    // TODO:: Move to utils
    const verifiedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!verifiedPassword)
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password" });

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      error: false,
      accessToken,
      refreshToken,
      message: "Logged in sucessfully!!",
      user: [
        {
          name: user.userName,
          email: user.email,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

/**
 * @param {POST: http://localhost:7000/api/auth/view/refresh-token} req
 * @param {error: false, message: "Access token created successfully!!"} res
 * @returns
 */

export const refreshToken = async (req, res) => {
  const { error } = validations.refreshTokenBodyValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });

  verifyRefreshToken(req.body.refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };

      const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });

      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully!!",
      });
    })
    .catch((err) => res.status(400).json(err));
};

/**
 * @param {POST: http://localhost:7000/api/auth/view/refresh-token} req
 * @param {error: false, message: "Logged Out Sucessfully!!"} res
 * @returns
 */

export const logOut = async (req, res) => {
  try {
    const { error } = validations.refreshTokenBodyValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: true, message: error.details[0].message });

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });

    if (!userToken)
      return res
        .status(200)
        .json({ error: false, message: "Logged Out Sucessfully" });

    await userToken.remove();

    res.status(200).json({ error: false, message: "Logged Out Sucessfully!!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
