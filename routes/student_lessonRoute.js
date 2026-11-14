
const { Router } = require("express");
const student_lesson = Router();

const {
  addStudent_lesson,
  getStudent_lesson,
  getStudentLessonById,
  updateStudentLesson,
  deleteStudentLesson
} = require("../controllers/student_lesson.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createStudentLessonValidationSchema,
  updateStudentLessonValidationSchema,
} = require("../validation/student_lessonValidation");

/**
 * @swagger
 * tags:
 *   - name: Student_Lesson
 *     description: Student_Lesson uchun API endpointlar
 */

/**
 * @swagger
 * /student_lesson/addStudent_lesson:
 *   post:
 *     summary: Yangi Student_Lesson qo'shish
 *     tags: [Student_Lesson]
 *     description: Yangi Student_Lesson yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: string
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student_Lesson muvaffaqiyatli qo'shildi
 *       400:
 *         description: Noto'g'ri ma'lumot yuborildi
 *       500:
 *         description: Ichki server xatosi
 */
student_lesson.post(
  "/addStudent_lesson",
  validationSchema(createStudentLessonValidationSchema),
  addStudent_lesson
);

/**
 * @swagger
 * /student_lesson/getStudent_lesson:
 *   get:
 *     summary: Barcha Student_Lesson larni olish
 *     tags: [Student_Lesson]
 *     description: Barcha Student_Lesson lar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Student_Lesson lar ro'yxati
 *       500:
 *         description: Ichki server xatosi
 */
student_lesson.get("/getStudent_lesson", getStudent_lesson);

/**
 * @swagger
 * /student_lesson/getStudentLessonById/{id}:
 *   get:
 *     summary: Student_Lesson ni ID bo'yicha olish
 *     tags: [Student_Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student_Lesson ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student_Lesson muvaffaqiyatli qaytarildi
 *       404:
 *         description: Student_Lesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
student_lesson.get("/getStudentLessonById/:id", getStudentLessonById);

/**
 * @swagger
 * /student_lesson/updateStudentLesson/{id}:
 *   put:
 *     summary: Student_Lesson ni yangilash
 *     tags: [Student_Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Student_Lesson ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lesson_id:
 *                 type: string
 *               student_id:
 *                 type: string
 *               is_there:
 *                 type: string
 *               reason:
 *                 type: string
 *               be_paid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student_Lesson muvaffaqiyatli yangilandi
 *       400:
 *         description: Validatsiya xatosi
 *       404:
 *         description: Student_Lesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
student_lesson.put(
  "/updateStudentLesson/:id",
  validationSchema(updateStudentLessonValidationSchema),
  updateStudentLesson
);

/**
 * @swagger
 * /student_lesson/deleteStudentLesson/{id}:
 *   delete:
 *     summary: Student_Lesson ni ID orqali o'chirish
 *     tags: [Student_Lesson]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan Student_Lesson ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student_Lesson muvaffaqiyatli o'chirildi
 *       404:
 *         description: Student_Lesson topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
student_lesson.delete("/deleteStudentLesson/:id", deleteStudentLesson);

module.exports = { student_lesson };
