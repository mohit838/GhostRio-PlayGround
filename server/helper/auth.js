import jsonwebtoken from "jsonwebtoken";

class Authorization {
  authorized(req, res, next) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split("Bearer ")[1];
      const verify = jsonwebtoken.verify(token, process.env.JWT_CODE);

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
