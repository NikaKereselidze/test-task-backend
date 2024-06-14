const Joi = require("joi");

module.exports = function Validator(validator) {
  if (!validator) throw new Error(`validator does not exist`);

  return async function (req, res, next) {
    try {
      const { body, query, params } = req;
      const target = {};
      if (!isEmpty(body)) target.body = body;
      if (!isEmpty(query)) target.query = query;
      if (!isEmpty(params)) target.params = params;
      const validated = await validator.validateAsync(target);
      req.body = validated.body || {};
      req.query = validated.query || {};
      req.params = validated.params || {};
      next();
    } catch (err) {
      return next(err);
    }
  };
};

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
