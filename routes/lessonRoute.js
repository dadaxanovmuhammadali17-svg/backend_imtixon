const { Router } = require("express");
const lesson = Router();

const { addLesson, getLesson, getLessonById, updateLesson, deleteLesson, searchLesson } = require("../controllers/lesson.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addLessonValidationSchema,
   updateLessonValidationSchema,
} = require("../validation/lessonValidation");

/**
 * tags:
 *  name:Lessons
 *  description: Darslarni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /lesson/addLesson:
 *    post:
 *       summary: Yangi Dars ro'yxatdan o'tkazish
 *       tags: [Lessons]
 *       description: Yangi Dars yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - lesson_theme
 *                      - lesson_number
 *                      - group_id
 *                      - lesson_date
 *                   properties:
 *                      lesson_theme:
 *                         type: string
 *                         example: JavaScript
 *                      lesson_number:
 *                         type: number
 *                         example: 1
 *                      group_id:
 *                         type: string
 *                         example: id
 *                      lesson_date:
 *                         type: date
 *                         example: 2026-11-14
 *       responses:
 *          201:
 *             description: Lesson muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
lesson.post("/addLesson", validateSchema(addLessonValidationSchema), addLesson);

/**
 * @swagger
 * /lesson/getLesson:
 *    get:
 *       summary: Barcha Darslar ro'yxatini olish
 *       tags: [Lessons]
 *       description: Barcha Darslar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Darslar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
lesson.get("/getLesson", getLesson);

/**
 * @swagger
 * /lesson/getLessonById/{id}:
 *    get:
 *       summary: Darsni ID bo'yicha olish
 *       tags: [Lessons]
 *       description: Darsni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Darsni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Dars muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Dars topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
lesson.get("/getLessonById/:id", getLessonById);

/**
 * @swagger
 * /lesson/updateLesson/{id}:
 *    patch:
 *       summary: Darsni yangilash
 *       tags: [Lessons]
 *       description: Dars ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Darsning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      lesson_theme:
 *                         type: string
 *                         example: JavaScript asoslari
 *                      lesson_number:
 *                         type: number
 *                         example: 1
 *                      group_id:
 *                         type: string
 *                         example: 64f1a2b3c4d5e6f7a8b9c0d1
 *                      lesson_date:
 *                         type: date
 *                         example: 2026-11-14
 *       responses:
 *        '200':
 *         description: Dars muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Dars topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.patch("/updateLesson/:id", validateSchema(updateLessonValidationSchema), updateLesson);

/**
 * @swagger
 * /lesson/deleteLesson/{id}:
 *    delete:
 *      summary: Delete a Lesson by ID
 *      tags: [Lessons]
 *      description: Delete a Lesson with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the lesson to delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Lesson deleted successfully
 *          "404":
 *             description: Lesson not found
 *          "500":
 *             description: Internal server error
 */
lesson.delete("/deleteLesson/:id", deleteLesson);

/**
 * @swagger
 * /lesson/searchLesson:
 *   get:
 *     summary: Darsni qidirish
 *     tags:
 *       - Lessons
 *     description: Mavzu bo'yicha Darsni qidirish
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
 *       '404':
 *         description: Darslar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lesson.get("/searchLesson", searchLesson);

module.exports = { lesson };
