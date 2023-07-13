import jsonwebtoken from "jsonwebtoken";
import { JWT_CODE } from "../config/envConfig.js";

class Authorization {
  authorized(req, res, next) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split("Bearer ")[1];
      const verify = jsonwebtoken.verify(token, JWT_CODE);

      if (verify) {
        next();
      } else {
        return res.status(401).json({ errors: [{ msg: "Need Valid Token." }] });
      }
    } else {
      return res
        .status(401)
        .json({ errors: [{ msg: "Need Token For access!!" }] });
    }
  }
}

export const Auth = new Authorization();
