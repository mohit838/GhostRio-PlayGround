import { hashedYourPassowrd, jwtTokenCreate } from '../helper/helper.js';
import UserModel from '../models/UserModel.js';

export const registerUser = async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const { name, mobile, userType, email, password } = req.body;

  const isEmail = await UserModel.findOne({ email });
  const isMobile = await UserModel.findOne({ mobile });

  try {
    if (!isEmail && !isMobile) {
      const hashPassword = await hashedYourPassowrd(password);

      const newUser = await UserModel.create({
        name,
        email,
        mobile,
        image: req.file.filename,
        userType,
        password: hashPassword,
      });
      // @JWT token
      const token = jwtTokenCreate({ id: newUser._id, name: newUser.name });

      return res
        .status(201)
        .json({ success: true, msg: 'You account has been created.', token });
    } else {
      return res.status(401).json({
        success: false,
        msg: `${email} OR ${mobile} is already taken!`,
        param: 'email or mobile',
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
