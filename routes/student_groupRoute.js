const { Router } = require("express");
const student_group = Router();

const {
   addStudent_group,
   getStudent_groups,
   getStudent_groupById,
   updateStudent_group,
   deleteStudent_group,
} = require("../controllers/student_group.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addStudent_groupValidationSchema,
   updateStudent_groupValidationSchema,
} = require("../validation/student_groupValidation");

/**
 * tags:
 *  name: Student_group
 *  description: Student va guruhlarni bog'lash uchun API endpointlar
 */

/**
 * @swagger
 * /student_group/addStudent_group:
 *    post:
 *       summary: Yangi Student_group qo'shish
 *       tags: [Student_group]
 *       description: Studentni guruhga bog'laydi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - student_id
 *                      - group_id
 *                   properties:
 *                      student_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      group_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *       responses:
 *          201:
 *             description: Student_group muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
student_group.post("/addStudent_group", validateSchema(addStudent_groupValidationSchema), addStudent_group);

/**
 * @swagger
 * /student_group/getStudent_groups:
 *    get:
 *       summary: Barcha Student_grouplar ro'yxatini olish
 *       tags: [Student_group]
 *       description: Barcha Student_grouplar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Student_grouplar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
student_group.get("/getStudent_groups", getStudent_groups);

/**
 * @swagger
 * /student_group/getStudent_groupById/{id}:
 *    get:
 *       summary: Student_groupni ID bo'yicha olish
 *       tags: [Student_group]
 *       description: Student_groupni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Student_groupni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Student_group muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Student_group topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
student_group.get("/getStudent_groupById/:id", getStudent_groupById);

/**
 * @swagger
 * /student_group/updateStudent_group/{id}:
 *    patch:
 *       summary: Student_groupni yangilash
 *       tags: [Student_group]
 *       description: Student_group ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Student_groupning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      student_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      group_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *       responses:
 *        '200':
 *         description: Student_group muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Student_group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
student_group.patch("/updateStudent_group/:id", validateSchema(updateStudent_groupValidationSchema), updateStudent_group);

/**
 * @swagger
 * /student_group/deleteStudent_group/{id}:
 *    delete:
 *      summary: Student_groupni ID bo'yicha o'chirish
 *      tags: [Student_group]
 *      description: Berilgan ID bo'yicha Student_groupni o'chirish
 *      parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Student_groupning ID si
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Student_group muvaffaqiyatli o'chirildi
 *          "404":
 *             description: Student_group topilmadi
 *          "500":
 *             description: Ichki server xatosi
 */
student_group.delete("/deleteStudent_group/:id", deleteStudent_group);

module.exports = { student_group };
