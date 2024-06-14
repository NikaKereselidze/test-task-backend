const {
  signUpService,
  signInService,
  getMeService,
} = require("../services/auth.service");

exports.signUp = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await signUpService(email.toLowerCase(), password);
    return res.status(201).json({
      result: "Success",
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await signInService(email.toLowerCase(), password);
    return res.status(200).json({
      result: "Success",
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await getMeService(userId);
    return res.status(200).json({
      result: "Success",
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
