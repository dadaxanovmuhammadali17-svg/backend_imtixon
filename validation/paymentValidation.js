const Joi = require('joi');

const createPaymentValidationSchema = Joi.object({
   student_id: Joi.string().optional(),
   payment_last_date: Joi.string().optional(),
   payment_date: Joi.string().optional(),
   price: Joi.string().optional(),
   is_paid: Joi.string().optional(),
   total_attent: Joi.string().optional()
});

const updatePaymentValidationSchema = Joi.object({
   student_id: Joi.string().optional(),
   payment_last_date: Joi.string().optional(),
   payment_date: Joi.string().optional(),
   price: Joi.string().optional(),
   is_paid: Joi.string().optional(),
   total_attent: Joi.string().optional()
});

module.exports = {
   createPaymentValidationSchema,
   updatePaymentValidationSchema
};