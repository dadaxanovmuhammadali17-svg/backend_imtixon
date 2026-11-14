const Joi = require('joi');

const createStudentLessonValidationSchema = Joi.object({
   lesson_id: Joi.string().optional(),
   student_id: Joi.string().optional(),
   is_there: Joi.string().optional(),
   reason: Joi.string().optional(),
   be_paid: Joi.string().optional()
});

const updateStudentLessonValidationSchema = Joi.object({
   lesson_id: Joi.string().optional(),
   student_id: Joi.string().optional(),
   is_there: Joi.string().optional(),
   reason: Joi.string().optional(),
   be_paid: Joi.string().optional()
});

module.exports = {
   createStudentLessonValidationSchema,
   updateStudentLessonValidationSchema
};