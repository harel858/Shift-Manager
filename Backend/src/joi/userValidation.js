const joi = require("joi");

const schema = joi.object({
  name: joi.string().max(20).required(),
  lastName: joi.string().max(20).required(),
  email: joi.string().email().required(),
  phone: joi.string().required(),
  currency: joi.object().required(),
  payment: joi.required(),
  overTime: joi.boolean(),
  workPlace: joi.string().required(),
  password: joi.string().required(),
});

function validateUser(user) {
  return schema.validate(user);
}

module.exports = validateUser;
