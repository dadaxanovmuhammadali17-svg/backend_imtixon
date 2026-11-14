const { Router } = require("express");
const reason_lid = Router();

const { addReason_lid, getReason_lid, getReason_lidById, updateReason_lid, deleteReason_lid, searchReason_lid } = require("../controllers/reason_lid.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addReason_lidValidationSchema,
   updateReason_lidValidationSchema,
} = require("../validation/reason_lidValidation");

/**
 * tags:
 *  name:Reason_lid
 *  description: Lid sabablarini boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /reason_lid/addReason_lid:
 *    post:
 *       summary: Yangi Reason_lid ro'yxatdan o'tkazish
 *       tags: [Reason_lid]
 *       description: Yangi Reason_lid yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - reason_lid
 *                   properties:
 *                      reason_lid:
 *                         type: string
 *                         example: Narxi qimmat
 *       responses:
 *          201:
 *             description: Reason_lid muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
reason_lid.post("/addReason_lid", validateSchema(addReason_lidValidationSchema), addReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lid:
 *    get:
 *       summary: Barcha Reason_lidlar ro'yxatini olish
 *       tags: [Reason_lid]
 *       description: Barcha Reason_lidlar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Reason_lidlar ro'yxati muvaffaqiyatli qaytarildi
 *            '500':
 *                description: Ichki server xatosi
 */
reason_lid.get("/getReason_lid", getReason_lid);

/**
 * @swagger
 * /reason_lid/getReason_lidById/{id}:
 *    get:
 *       summary: Reason_lidni ID bo'yicha olish
 *       tags: [Reason_lid]
 *       description: Reason_lidni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Reason_lidni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Reason_lid muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Reason_lid topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
reason_lid.get("/getReason_lidById/:id", getReason_lidById);

/**
 * @swagger
 * /reason_lid/updateReason_lid/{id}:
 *    patch:
 *       summary: Reason_lidni yangilash
 *       tags: [Reason_lid]
 *       description: Reason_lid ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Reason_lidning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      reason_lid:
 *                         type: string
 *                         example: Vaqti yo'q
 *       responses:
 *        '200':
 *         description: Reason_lid muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Reason_lid topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.patch("/updateReason_lid/:id", validateSchema(updateReason_lidValidationSchema), updateReason_lid);

/**
 * @swagger
 * /reason_lid/deleteReason_lid/{id}:
 *    delete:
 *      summary: Delete a Reason_lid by ID
 *      tags: [Reason_lid]
 *      description: Delete a Reason_lid with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the reason_lid to delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Reason_lid deleted successfully
 *          "404":
 *             description: Reason_lid not found
 *          "500":
 *             description: Internal server error
 */
reason_lid.delete("/deleteReason_lid/:id", deleteReason_lid);

/**
 * @swagger
 * /reason_lid/searchReason_lid:
 *   get:
 *     summary: Reason_lidni qidirish
 *     tags:
 *       - Reason_lid
 *     description: Sabab bo'yicha Reason_lidni qidirish
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
 *         description: Reason_lidlar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
reason_lid.get("/searchReason_lid", searchReason_lid);

module.exports = { reason_lid };
