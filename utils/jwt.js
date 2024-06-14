const jwt = require("jsonwebtoken");

exports.generateJwt = (user, secret, expiresIn = "24d") => {
  const { _id: userId, email, createdAt } = user;
  const token = jwt.sign(
    {
      userId,
      email,
      createdAt,
    },
    secret,
    {
      expiresIn,
    }
  );
  return token;
};
