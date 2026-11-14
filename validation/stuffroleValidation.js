const Joi = require("joi")

const addStuffroleValidationSchema = Joi.object({
   stuff_id: Joi.string().required(),
   role_id: Joi.string().required(),
});

const updateStuffroleValidationSchema = Joi.object({
   stuff_id: Joi.string(),
   role_id: Joi.string(),
});

module.exports = {
   addStuffroleValidationSchema,
   updateStuffroleValidationSchema,
};
