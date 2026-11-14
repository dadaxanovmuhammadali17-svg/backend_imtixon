const Joi = require("joi");

const addStageValidationSchema = Joi.object({
   name: Joi.string().required(),
})

const updateStageValidationSchema = Joi.object({
   name: Joi.string(),
})

module.exports = {
   addStageValidationSchema,
   updateStageValidationSchema,
}