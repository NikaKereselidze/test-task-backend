class InvalidCredentials extends Error {
  constructor(message, statusCode = 401) {
    super(message);
    this.name = "CredentialsInvalid";
    this.statusCode = statusCode;
  }
}

module.exports = InvalidCredentials;
