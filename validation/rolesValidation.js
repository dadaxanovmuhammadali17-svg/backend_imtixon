const Joi = require("joi");

const addRoleValidationSchema = Joi.object({
   name: Joi.string().required(),
})

const updateRoleValidationSchema = Joi.object({
   name: Joi.string(),
})

module.exports = {
   addRoleValidationSchema,
   updateRoleValidationSchema,
}