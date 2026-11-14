const Joi = require("joi");

const addLidValidationSchema = Joi.object({
   first_name: Joi.string().required(),
   last_name: Joi.string().required(),
   phone_number: Joi.string()
      .pattern(/^\+998\d{9}$/)
      .required(),
   lid_stage_id: Joi.string().optional().allow(null, ""),
   test_date: Joi.date().optional().allow(null, ""),
   trial_lesson_date: Joi.number().optional().allow(null, ""),
   trial_lesson_time: Joi.string().optional().allow(null, ""),
   trial_lesson_group_id: Joi.string().optional().allow(null, ""),
   lid_status_id: Joi.string().optional().allow(null, ""),
   cancel_reson_id: Joi.string().optional().allow(null, ""),
});

const updateLidValidationSchema = Joi.object({
   first_name: Joi.string(),
   last_name: Joi.string(),
   phone_number: Joi.string().pattern(/^\+998\d{9}$/),
   lid_stage_id: Joi.string().optional().allow(null, ""),
   test_date: Joi.date().optional().allow(null, ""),
   trial_lesson_date: Joi.number().optional().allow(null, ""),
   trial_lesson_time: Joi.string().optional().allow(null, ""),
   trial_lesson_group_id: Joi.string().optional().allow(null, ""),
   lid_status_id: Joi.string().optional().allow(null, ""),
   cancel_reson_id: Joi.string().optional().allow(null, ""),
});

module.exports = {
   addLidValidationSchema,
   updateLidValidationSchema,
};
