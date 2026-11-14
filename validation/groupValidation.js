const Joi = require("joi")

const addGroupValidationSchema = Joi.object({
   group_name: Joi.string().required(),
   lesson_start_time: Joi.string().required(),
   lesson_continuous: Joi.string().required(),
   lesson_week_day: Joi.string().required(),
   group_stage_idint: Joi.string().required(),
   room_number: Joi.string().required(),
   room_floor: Joi.number().required(),
   branch_id: Joi.string().required(),
   lessons_quant: Joi.number().required(),
   is_active: Joi.boolean().required(),
});

const updateGroupValidationSchema = Joi.object({
   group_name: Joi.string(),
   lesson_start_time: Joi.string(),
   lesson_continuous: Joi.string(),
   lesson_week_day: Joi.string(),
   group_stage_idint: Joi.string(),
   room_number: Joi.string(),
   room_floor: Joi.number(),
   branch_id: Joi.string(),
   lessons_quant: Joi.number(),
   is_active: Joi.boolean(),
});

module.exports = {
   addGroupValidationSchema,
   updateGroupValidationSchema,
};
