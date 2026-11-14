const { Router } = require("express");
const lid_status = Router();

const { addLid_status, getLid_status, getLid_statusById, updateLid_status, deleteLid_status, searchLid_status } = require("../controllers/lid_status.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addLid_statusValidationSchema,
   updateLid_statusValidationSchema,
} = require("../validation/lid_statusValidation");

/**
 * tags:
 *  name:Lid_status
 *  description: Lid statuslarni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /lid_status/addLid_status:
 *    post:
 *       summary: Yangi Lid status ro'yxatdan o'tkazish
 *       tags: [Lid_status]
 *       description: Yangi Lid status yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - name
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: Yangi
 *       responses:
 *          201:
 *             description: Lid_status muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
lid_status.post("/addLid_status", validateSchema(addLid_statusValidationSchema), addLid_status);

/**
 * @swagger
 * /lid_status/getLid_status:
 *    get:
 *       summary: Barcha Lid statuslar ro'yxatini olish
 *       tags: [Lid_status]
 *       description: Barcha Lid statuslar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Lid statuslar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
lid_status.get("/getLid_status", getLid_status);

/**
 * @swagger
 * /lid_status/getLid_statusById/{id}:
 *    get:
 *       summary: Lid statusni ID bo'yicha olish
 *       tags: [Lid_status]
 *       description: Lid statusni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Lid statusni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Lid status muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Lid status topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
lid_status.get("/getLid_statusById/:id", getLid_statusById);

/**
 * @swagger
 * /lid_status/updateLid_status/{id}:
 *    patch:
 *       summary: Lid statusni yangilash
 *       tags: [Lid_status]
 *       description: Lid status ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Lid statusning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: Bog'lanildi
 *       responses:
 *        '200':
 *         description: Lid status muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Lid status topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.patch("/updateLid_status/:id", validateSchema(updateLid_statusValidationSchema), updateLid_status);

/**
 * @swagger
 * /lid_status/deleteLid_status/{id}:
 *    delete:
 *      summary: Delete a Lid_status by ID
 *      tags: [Lid_status]
 *      description: Delete a Lid_status with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the lid_status to delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Lid_status deleted successfully
 *          "404":
 *             description: Lid_status not found
 *          "500":
 *             description: Internal server error
 */
lid_status.delete("/deleteLid_status/:id", deleteLid_status);

/**
 * @swagger
 * /lid_status/searchLid_status:
 *   get:
 *     summary: Lid statusni qidirish
 *     tags:
 *       - Lid_status
 *     description: Nom bo'yicha Lid statusni qidirish
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
 *         description: Lid statuslar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
lid_status.get("/searchLid_status", searchLid_status);

module.exports = { lid_status };
