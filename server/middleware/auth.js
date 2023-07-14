import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/envConfig.js";

const auth = async (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (headerToken) {
    const token = headerToken.split("Bearer ")[1];

    if (!token)
      return res
        .status(403)
        .json({ error: true, message: "Access Denied: No token provided!!" });

    try {
      const tokenDetails = jwt.verify(token, ACCESS_TOKEN);
      req.user = tokenDetails;
      next();
    } catch (err) {
      console.log(err);
      res
        .status(403)
        .json({ error: true, message: "Access Denied: Invalid token!!" });
    }
  } else {
    res
      .status(403)
      .json({ error: true, message: "Access Denied: Invalid token!!" });
  }
};

export default auth;
