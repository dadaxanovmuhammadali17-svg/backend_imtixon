const Joi = require("joi");

const addStudentValidationSchema = Joi.object({
   lid_id: Joi.string().optional().allow(null, ""),
   first_name: Joi.string().required(),
   last_name: Joi.string().required(),
   phone_number: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required(),
   birthday: Joi.date().optional().allow(null, ""),
   gender: Joi.string().valid("male", "female").required(),
});

const updateStudentValidationSchema = Joi.object({
   lid_id: Joi.string().optional().allow(null, ""),
   first_name: Joi.string(),
   last_name: Joi.string(),
   phone_number: Joi.string().pattern(/^\+998\d{9}$/),
   birthday: Joi.date().optional().allow(null, ""),
   gender: Joi.string().valid("male", "female"),
});

module.exports = {
   addStudentValidationSchema,
   updateStudentValidationSchema,
};
