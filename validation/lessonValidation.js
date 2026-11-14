const Joi = require("joi");

const addLessonValidationSchema = Joi.object({
   lesson_theme: Joi.string().required(),
   lesson_number: Joi.number().required(),
   group_id: Joi.string().required(),
   lesson_date: Joi.date().required(),
});

const updateLessonValidationSchema = Joi.object({
   lesson_theme: Joi.string(),
   lesson_number: Joi.number(),
   group_id: Joi.string(),
   lesson_date: Joi.date(),
});

module.exports = {
   addLessonValidationSchema,
   updateLessonValidationSchema,
};
