const Joi = require("joi");

const addReason_lidValidationSchema = Joi.object({
   reason_lid: Joi.string().required(),
});

const updateReason_lidValidationSchema = Joi.object({
   reason_lid: Joi.string(),
});

module.exports = {
   addReason_lidValidationSchema,
   updateReason_lidValidationSchema,
};
