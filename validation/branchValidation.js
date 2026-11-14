const Joi = require("joi");

const addBranchValidationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  call_number: Joi.string()
    .pattern(/^\+998\d{9}$/)
    .required(),
});

const updateBranchValidationSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  call_number: Joi.string()
    .pattern(/^\+998\d{9}$/),
});

module.exports = {
  addBranchValidationSchema,
  updateBranchValidationSchema,
};
