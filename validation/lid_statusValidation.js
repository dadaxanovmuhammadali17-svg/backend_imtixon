const Joi = require("joi");

const addLid_statusValidationSchema = Joi.object({
   name: Joi.string().required(),
});

const updateLid_statusValidationSchema = Joi.object({
   name: Joi.string(),
});

module.exports = {
   addLid_statusValidationSchema,
   updateLid_statusValidationSchema,
};
