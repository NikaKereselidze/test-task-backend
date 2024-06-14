const User = require("../models/User.model");
const {
  UserAlreadyExist,
  InvalidCredentials,
  UserNotFound,
} = require("../exceptions");
const { generateJwt } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/hashing");

exports.signUpService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new UserAlreadyExist("User already exists");
    }

    const hashedPwd = await hashPassword(password);

    const insertedUser = await User.create({
      email,
      password: hashedPwd,
    });

    const token = generateJwt(insertedUser, process.env.JWT_SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.signInService = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UserNotFound("User not found");
    }

    if (!(await comparePassword(password, user.password))) {
      throw new InvalidCredentials("Invalid credentials");
    }

    const token = generateJwt(user, process.env.JWT_SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getMeService = async (userId) => {
  try {
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      throw new UserNotFound("User not found");
    }
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
