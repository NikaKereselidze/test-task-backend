const Joi = require("joi");

exports.authValidator = Joi.object({
  body: {
    email: Joi.string().required(),
    password: Joi.string().required(),
  },
});
