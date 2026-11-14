const { Router } = require("express");
const stuffroles = Router();

const { addStuffrole, getStuffrole, getStuffroleById, updateStuffrole, deleteStuffrole } = require("../controllers/stuffrole.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
}

const {
   addStuffroleValidationSchema,
   updateStuffroleValidationSchema,
} = require("../validation/stuffroleValidation")

/**
 * tags:
 *  name:Stuffroles
 *  description: Stuffrolelar boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /stuffroles/addStuffrole:
 *    post:
 *       summary: Yangi Stuffrole ro'yxatdan o'tkazish
 *       tags: [Stuffroles]
 *       description: Yangi stuffrolelar yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - stuff_id
 *                      - role_id
 *                   properties:
 *                      stuff_id:
 *                         type: string
 *                         example: id
 *                      role_id:
 *                         type: string
 *                         example: id
 *       responses:
 *          201:
 *             description: Stuffrole muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */

stuffroles.post("/addStuffrole", validateSchema(addStuffroleValidationSchema), addStuffrole);

/**
 * @swagger
 * /stuffroles/getStuffrole:
 *    get:
 *       summary: Barcha Stuffrolelar olish
 *       tags: [Stuffroles]
 *       description: Barcha Stuffrolelar ro'yxatini olish
 *       responses:
 *           '200':
 *              description: Stuffrolelar ro'yxatini olish
 *           '500':
 *              description: Ichki server xatosi
 */
stuffroles.get("/getStuffrole", getStuffrole);

/**
 * @swagger
 * /stuffroles/getStuffroleById/{id}:
 *    get:
 *       summary: Stuffrolelarni ID bo'yicha olish
 *       tags: [Stuffroles]
 *       description: Stuffrolelarni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Stuffrolelarni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Stuffrolelar muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Stuffrolelar topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
stuffroles.get("/getStuffroleById/:id", getStuffroleById);

/**
 * @swagger
 * /stuffroles/updateStuffrole/{id}:
 *    patch:
 *       summary: Stuffrolelarni yangilash
 *       tags: [Stuffroles]
 *       description: Stuffrole ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Stuffrolelarning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      stuff_id:
 *                         type: string
 *                         example: id
 *                      role_id:
 *                         type: string
 *                         example: id
 *       responses:
 *        '200':
 *         description: Stuffrolelar muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Stuffrole topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuffroles.patch("/updateStuffrole/:id", validateSchema(updateStuffroleValidationSchema), updateStuffrole);

/**
 * @swagger
 * /stuffroles/deleteStuffrole/{id}:
 *    delete:
 *      summary: Delete a Stuffrole by ID
 *      tags: [Stuffroles]
 *      description: Delete a Stuffrole with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the userto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Stuffrole deleted successfully
 *          "404":
 *             description: Stuffrole not found
 *          "500":
 *             description: Internal server error
 */
stuffroles.delete("/deleteStuffrole/:id", deleteStuffrole);

module.exports = { stuffroles }