const { Router } = require("express");
const group_stuffs = Router();

const { addGroup_stuff, getGroup_stuff, getGroup_stuffById, updateGroup_stuff, deleteGroup_stuff } = require("../controllers/group_stuff.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
}

const {
   addGroup_stuffValidationSchema,
   updateGroup_stuffValidationSchema,
} = require("../validation/group_stuffValidation")

/**
 * tags:
 *  name:group_stuffs
 *  description: Group_stufflar boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /group_stuffs/addGroup_stuff:
 *    post:
 *       summary: Yangi Group_stuff ro'yxatdan o'tkazish
 *       tags: [Group_stuffs]
 *       description: Yangi Group_stufflar yaratadi.
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
 *                      group_id:
 *                         type: string
 *                         example: id
 *       responses:
 *          201:
 *             description: Group_stuff muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */

group_stuffs.post("/addGroup_stuff", validateSchema(addGroup_stuffValidationSchema), addGroup_stuff);

/**
 * @swagger
 * /group_stuffs/getGroup_stuff:
 *    get:
 *       summary: Barcha Group_stufflar olish
 *       tags: [Group_stuffs]
 *       description: Barcha Group_stufflar ro'yxatini olish
 *       responses:
 *           '200':
 *              description: Group_stufflar ro'yxatini olish
 *           '500':
 *              description: Ichki server xatosi
 */
group_stuffs.get("/getGroup_stuff", getGroup_stuff);

/**
 * @swagger
 * /group_stuffs/getGroup_stuffById/{id}:
 *    get:
 *       summary: Group_stufflarni ID bo'yicha olish
 *       tags: [Group_stuffs]
 *       description: Group_stufflarni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Group_stufflarni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Group_stufflar muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Group_stufflar topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
group_stuffs.get("/getGroup_stuffById/:id", getGroup_stuffById);

/**
 * @swagger
 * /group_stuffs/updateGroup_stuff/{id}:
 *    patch:
 *       summary: Group_stufflarni yangilash
 *       tags: [Group_stuffs]
 *       description: Group_stuff ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Group_stufflarning ID raqami
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
 *                      group_id:
 *                         type: string
 *                         example: id
 *       responses:
 *        '200':
 *         description: Group_stufflar muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Group_stuff topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
group_stuffs.patch("/updateGroup_stuff/:id", validateSchema(updateGroup_stuffValidationSchema), updateGroup_stuff);

/**
 * @swagger
 * /group_stuffs/deleteGroup_stuff/{id}:
 *    delete:
 *      summary: Delete a Group_stuff by ID
 *      tags: [Group_stuffs]
 *      description: Delete a Group_stuff with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the userto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Group_stuff deleted successfully
 *          "404":
 *             description: Group_stuff not found
 *          "500":
 *             description: Internal server error
 */
group_stuffs.delete("/deleteGroup_stuff/:id", deleteGroup_stuff);

module.exports = { group_stuffs }