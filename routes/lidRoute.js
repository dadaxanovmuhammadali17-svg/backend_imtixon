const { Router } = require("express");
const lid = Router();

const {
   addLid,
   getLid,
   getLidById,
   updateLid,
   deleteLid,
   searchLid,
} = require("../controllers/lid.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addLidValidationSchema,
   updateLidValidationSchema,
} = require("../validation/lidValidation");

/**
 * tags:
 *  name: Lid
 *  description: Lidlarni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /lid/addLid:
 *    post:
 *       summary: Yangi Lid ro'yxatdan o'tkazish
 *       tags: [Lid]
 *       description: Yangi Lid yaratadi.
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
 *                   properties:
 *                      first_name:
 *                         type: string
 *                         example: Ali
 *                      last_name:
 *                         type: string
 *                         example: Valiyev
 *                      phone_number:
 *                         type: string
 *                         example: +998901234567
 *                      lid_stage_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      test_date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-01
 *                      trial_lesson_date:
 *                         type: number
 *                         example: 1
 *                      trial_lesson_time:
 *                         type: string
 *                         example: "10:00"
 *                      trial_lesson_group_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *                      lid_status_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e3
 *                      cancel_reson_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e4
 *       responses:
 *          201:
 *             description: Lid muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
lid.post("/addLid", validateSchema(addLidValidationSchema), addLid);

/**
 * @swagger
 * /lid/getLid:
 *    get:
 *       summary: Barcha Lidlar ro'yxatini olish
 *       tags: [Lid]
 *       description: Barcha Lidlar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Lidlar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
lid.get("/getLid", getLid);

/**
 * @swagger
 * /lid/getLidById/{id}:
 *    get:
 *       summary: Lidni ID bo'yicha olish
 *       tags: [Lid]
 *       description: Lidni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Lidni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Lid muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Lid topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
lid.get("/getLidById/:id", getLidById);

/**
 * @swagger
 * /lid/updateLid/{id}:
 *    patch:
 *       summary: Lidni yangilash
 *       tags: [Lid]
 *       description: Lid ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Lidning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      first_name:
 *                         type: string
 *                         example: Ali
 *                      last_name:
 *                         type: string
 *                         example: Valiyev
 *                      phone_number:
 *                         type: string
 *                         example: +998901234567
 *                      lid_stage_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e1
 *                      test_date:
 *                         type: string
 *                         format: date
 *                         example: 2024-12-01
 *                      trial_lesson_date:
 *                         type: number
 *                         example: 1
 *                      trial_lesson_time:
 *                         type: string
 *                         example: "10:00"
 *                      trial_lesson_group_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e2
 *                      lid_status_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e3
 *                      cancel_reson_id:
 *                         type: string
 *                         example: 64a1b2c3d4e5f6a7b8c9d0e4
 *       responses:
 *        '200':
 *         description: Lid muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.patch("/updateLid/:id", validateSchema(updateLidValidationSchema), updateLid);

/**
 * @swagger
 * /lid/deleteLid/{id}:
 *    delete:
 *      summary: Lidni ID bo'yicha o'chirish
 *      tags: [Lid]
 *      description: Berilgan ID bo'yicha Lidni o'chirish
 *      parameters:
 *       - in: path
 *         name: id
 *         description: O'chiriladigan Lidning ID si
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Lid muvaffaqiyatli o'chirildi
 *          "404":
 *             description: Lid topilmadi
 *          "500":
 *             description: Ichki server xatosi
 */
lid.delete("/deleteLid/:id", deleteLid);

/**
 * @swagger
 * /lid/searchLid:
 *   get:
 *     summary: Lidni qidirish
 *     tags:
 *       - Lid
 *     description: Ism, familiya yoki telefon raqam bo'yicha Lidni qidirish
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
 *         description: Lidlar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid.get("/searchLid", searchLid);

module.exports = { lid };
