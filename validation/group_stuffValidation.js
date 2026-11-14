const Joi = require("joi")

const addgroup_stuffroleValidationSchema = Joi.object({
   stuff_id: Joi.string().required(),
   group_id: Joi.string().required(),
});

const updategroup_stuffroleValidationSchema = Joi.object({
   stuff_id: Joi.string(),
   group_id: Joi.string(),
});

module.exports = {
   addgroup_stuffroleValidationSchema,
   updategroup_stuffroleValidationSchema,
};
