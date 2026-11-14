const { Router } = require("express");
const groups = Router();

const { addGroup, getGroups, getGroupById, updateGroup, deleteGroup, searchGroup } = require("../controllers/group.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.vaGroupate(req.body);
   if (vaGroupationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addGroupValidationSchema,
   updateGroupValidationSchema,
} = require("../validation/groupValidation")

/**
 * tags:
 *  name:Groups
 *  description: Group boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /groups/addGroup:
 *    post:
 *       summary: Yangi Group ro'yxatdan o'tkazish
 *       tags: [Groups]
 *       description: Yangi Group yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - group_name
 *                      - branch_id
 *                   properties:
 *                      group_name:
 *                         type: string
 *                         example: Enchlish
 *                      lesson_start_time:
 *                         type: string
 *                         example: 10.00
 *                      lesson_continuous:
 *                         type: string
 *                         example: 2hour
 *                      lesson_week_day:
 *                         type: date
 *                         example: mon
 *                      group_stage_idint:
 *                         type: string
 *                         example: id
 *                      room_number:
 *                         type: string
 *                         example: 2a
 *                      room_floor:
 *                         type: number
 *                         example: 4
 *                      branch_id:
 *                         type: string
 *                         example: id
 *                      lessons_quant:
 *                         type: number
 *                         example: 8
 *                      is_active:
 *                         type: boolean
 *                         example: true
 *       responses:
 *          201:
 *             description: Group muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
groups.post("/addGroup", validateSchema(addGroupValidationSchema), addGroup);

/**
 * @swagger
 * /groups/getGroups:
 *    get:
 *       summary: Barcha Grouplar ro'yxatini olish
 *       tags: [Groups]
 *       description: Barcha Grouplar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: Grouplar ro'yxati olish
 *            '500':
 *                description: Ichki server xatosi
 */
groups.get("/getGroups", getGroups);

/**
 * @swagger
 * /groups/getGroupById/{id}:
 *    get:
 *       summary: Group ID bo'yicha olish
 *       tags: [Groups]
 *       description: Group ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Group olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Group muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Group topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
groups.get("/getGroupById/:id", getGroupById);

/**
 * @swagger
 * /groups/updateGroup/{id}:
 *    patch:
 *       summary: Uylarni yangilash
 *       tags: [Groups]
 *       description: Group ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Grouplarning ID raqami
 *            schema:
 *                type: string
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      group_name:
 *                         type: string
 *                         example: Enchlish
 *                      lesson_start_time:
 *                         type: string
 *                         example: 10.00
 *                      lesson_continuous:
 *                         type: string
 *                         example: 2hour
 *                      lesson_week_day:
 *                         type: date
 *                         example: mon
 *                      group_stage_idint:
 *                         type: string
 *                         example: id
 *                      room_number:
 *                         type: string
 *                         example: 2a
 *                      room_floor:
 *                         type: number
 *                         example: 4
 *                      branch_id:
 *                         type: string
 *                         example: id
 *                      lessons_quant:
 *                         type: number
 *                         example: 8
 *                      is_active:
 *                         type: boolean
 *                         example: true
 *       responses:
 *        '200':
 *         description: Grouplar muvaffaqiyatli yangilandi
 *       '400':
 *         description: VaGroupatsiya xatosi
 *       '404':
 *         description: Group topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
groups.patch("/updateGroup/:id", validateSchema(updateGroupValidationSchema), updateGroup);

/**
 * @swagger
 * /groups/deleteGroup/{id}:
 *    delete:
 *      summary: Delete a house by ID
 *      tags: [Groups]
 *      description: Delete a Group with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the userto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Group deleted successfully
 *          "404":
 *             description: Group not found
 *          "500":
 *             description: Internal server error
 */
groups.delete("/deleteGroup/:id", deleteGroup);

/**
 * @swagger
 * /groups/searchGroup:
 *   get:
 *     summary: Uylarni qidirish
 *     tags:
 *       - Groups
 *     description: shaxar yoki uy raqami orqali foydalanuvchilarni qidirish
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
 *         description: Grouplar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
groups.get("/searchGroup", searchGroup);

module.exports = { groups }