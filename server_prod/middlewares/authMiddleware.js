import jsonwebtoken from "jsonwebtoken";
import { ACCESS_TOKEN } from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const headerToken = req.headers.authorization;

    if (headerToken) {
      const token = headerToken.split("Bearer ")[1];

      try {
        req.user = jsonwebtoken.verify(token, ACCESS_TOKEN);
        next();
      } catch (err) {
        console.log(err);
        res
          .status(401)
          .json({ success: true, msg: "Access Denied: Invalid token!!" });
      }
    } else {
      res
        .status(401)
        .json({ success: true, msg: "Access Denied: Invalid token!!" });
    }
  } catch (error) {
    res.status(500).json({ success: true, msg: "NS Has been in problem!!" });
  }
};
