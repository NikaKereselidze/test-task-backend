const Joi = require("joi");

exports.listProductsValidator = Joi.object({
  query: {
    search: Joi.string().optional().allow(""),
  },
});

exports.addProductValidator = Joi.object({
  body: {
    email: Joi.string().required(),
    expiresAt: Joi.date().optional(),
    name: Joi.string().required(),
  },
});

exports.deleteProductValidator = Joi.object({
  query: {
    productId: Joi.string().required(),
  },
});
