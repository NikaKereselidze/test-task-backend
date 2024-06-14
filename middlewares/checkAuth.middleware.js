const jwt = require("jsonwebtoken");
const { InvalidToken } = require("../exceptions");

module.exports = async (req, res, next) => {
  try {
    let decodedToken;
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw new InvalidToken("Unauthorized access");
    }
    const token = authHeader.split(" ")[1];
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new InvalidToken("Unauthorized access");
    }
    if (!decodedToken) {
      throw new InvalidToken("Unauthorized access");
    }

    // Get data from decodedToken
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    req.createdAt = decodedToken.createdAt;

    next();
  } catch (err) {
    return next(err);
  }
};
