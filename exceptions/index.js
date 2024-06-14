const InvalidCredentials = require("./InvalidCredentialsException");
const InvalidToken = require("./InvalidTokenException");
const UserAlreadyExist = require("./UserAlreadyExistException");
const UserNotFound = require("./UserNotFoundException");
module.exports = {
  InvalidToken,
  UserAlreadyExist,
  InvalidCredentials,
  UserNotFound,
};
