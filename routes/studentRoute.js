const { Router } = require("express");
const student = Router();

const {
   addStudent,
   getStudents,
   getStudentById,
   updateStudent,
   deleteStudent,
   searchStudent,
} = require("../controllers/student.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addStudentValidationSchema,
   updateStudentValidationSchema,
} = require("../validation/studentValidation");

/**
 * tags:
 *  name: Student
 *  description: Studentlarni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /student/addStudent:
 *    post:
 *       summary: Yangi Student qo'shish
 *       tags: [Student]
 *       description: Yangi Student yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - first_name
 *                      - last_name
 *                      - phone_number
 *                      - gender
 *                   properties:
 *                      lid_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      first_name:
 *                         type: string
 *                         example: Ali
 *                      last_name:
 *                         type: string
 *                         example: Valiyev
 *                      phone_number:
 *                         type: string
 *                         example: +998901234567
 *                      birthday:
 *                         type: string
 *                         format: date
 *                         example: 2000-05-15
 *                      gender:
 *                         type: string
 *                         enum: [male, female]
 *                         example: male
 *       responses:
 *          201:
 *             description: Student muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
student.post("/addStudent", validateSchema(addStudentValidationSchema), addStudent);

/**
 * @swagger
 * /student/getStudents:
 *    get:
 *       summary: Barcha Studentlar ro'yxatini olish
 *       tags: [Student]
 *       description: Barcha Studentlar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Studentlar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
student.get("/getStudents", getStudents);

/**
 * @swagger
 * /student/getStudentById/{id}:
 *    get:
 *       summary: Studentni ID bo'yicha olish
 *       tags: [Student]
 *       description: Studentni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Studentni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Student muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Student topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
student.get("/getStudentById/:id", getStudentById);

/**
 * @swagger
 * /student/updateStudent/{id}:
 *    patch:
 *       summary: Studentni yangilash
 *       tags: [Student]
 *       description: Student ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Studentning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      lid_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      first_name:
 *                         type: string
 *                         example: Ali
 *                      last_name:
 *                         type: string
 *                         example: Valiyev
 *                      phone_number:
 *                         type: string
 *                         example: +998901234567
 *                      birthday:
 *                         type: string
 *                         format: date
 *                         example: 2000-05-15
 *                      gender:
 *                         type: string
 *                         enum: [male, female]
 *                         example: male
 *       responses:
 *        '200':
 *         description: Student muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Student topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student.patch("/updateStudent/:id", validateSchema(updateStudentValidationSchema), updateStudent);

/**
 * @swagger
 * /student/deleteStudent/{id}:
 *    delete:
 *      summary: Studentni ID bo'yicha o'chirish
 *      tags: [Student]
 *      description: Berilgan ID bo'yicha Studentni o'chirish
 *      parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Studentning ID si
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Student muvaffaqiyatli o'chirildi
 *          "404":
 *             description: Student topilmadi
 *          "500":
 *             description: Ichki server xatosi
 */
student.delete("/deleteStudent/:id", deleteStudent);

/**
 * @swagger
 * /student/searchStudent:
 *   get:
 *     summary: Studentni qidirish
 *     tags:
 *       - Student
 *     description: Ism, familiya yoki telefon raqam bo'yicha Studentni qidirish
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Qidiruv so'rovi
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *       '400':
 *         description: Yaroqsiz qidiruv so'rovi
 *       '404':
 *         description: Studentlar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student.get("/searchStudent", searchStudent);

module.exports = { student };
