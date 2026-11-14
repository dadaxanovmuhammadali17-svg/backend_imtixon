const Joi = require("joi");

const addStudent_groupValidationSchema = Joi.object({
   student_id: Joi.string().required(),
   group_id: Joi.string().required(),
});

const updateStudent_groupValidationSchema = Joi.object({
   student_id: Joi.string().optional().allow(null, ""),
   group_id: Joi.string().optional().allow(null, ""),
});

module.exports = {
   addStudent_groupValidationSchema,
   updateStudent_groupValidationSchema,
};
