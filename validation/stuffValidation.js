const Joi = require("joi");
 
const registerValidationSchema = Joi.object({
   login: Joi.string().required().trim().min(3).max(30),
   parol: Joi.string()
      .required()
      .min(8)
      .max(30)
      .pattern( 
         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/ 
      ),
   firstname: Joi.string(),
   lastname: Joi.string(),
   is_active: Joi.boolean(),
   phone_number: Joi.string().pattern(/^\+998\d{9}$/),
});


const updateStuffValidationSchema = Joi.object({
   login: Joi.string().trim().min(3).max(50).optional(),
   parol: Joi.string()
      .optional()
      .min(8)
      .max(30)
      .pattern( 
         /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/ 
      ),
   lastname: Joi.string().optional(),
   firstname: Joi.string().optional(),
   is_active: Joi.boolean().optional(),
   phone_number: Joi.string().pattern(/^\+998\d{9}$/).optional(),
});

module.exports = {
   registerValidationSchema,
   updateStuffValidationSchema,
};