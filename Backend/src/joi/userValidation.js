const joi = require("joi");

const schema = joi.object({
  name: joi.string().min(2).max(20).required(),
  lastName: joi.string().min(2).max(20).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(6).max(14).required(),
  currency: joi.object().required(),
  payment: joi.required(),
  overTime: joi.boolean(),
  password: joi.string().required(),
});

function validateUser(user) {
  return schema.validate(user);
}

module.exports = validateUser;
