import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidation = (body) => {
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
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity(complexityOptions)
      .required()
      .label("Password"),
  });
  return schema.validate(body);
};

const logInBodyValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

const refreshTokenBodyValidation = (body) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required().label("Refresh Token"),
  });
  return schema.validate(body);
};

export {
  logInBodyValidation,
  refreshTokenBodyValidation,
  signUpBodyValidation,
};
