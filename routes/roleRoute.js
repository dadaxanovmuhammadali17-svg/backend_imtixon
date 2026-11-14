const { Router } = require("express");
const role = Router();

const { addRole, getRole, getRoleById, updateRole, deleteRole,searchRoles } = require("../controllers/role.controller");

const validateSchema = (schema) => (req, res, next) =>{
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
}

const {
   addRoleValidationSchema,
   updateRoleValidationSchema,
} = require("../validation/rolesValidation")

/**
 * tags:
 *  name:Roles
 *  description: Rollar boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /role/addRole:
 *    post:
 *       summary: Yangi Rol ro'yxatdan o'tkazish
 *       tags: [Roles]
 *       description: Yangi Rollar yaratadi.
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
 *                         example: Teacher
 *       responses:
 *          201:
 *             description: Role muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */

role.post("/addRole", validateSchema(addRoleValidationSchema), addRole);

/**
 * @swagger
 * /role/getRole:
 *    get:
 *       summary: Barcha Rollar olish
 *       tags: [Roles]
 *       description: Barcha Rolelar ro'yxatini olish
 *       responses:
 *           '200':
 *              description: Rollar ro'yxatini olish
 *           '500':
 *              description: Ichki server xatosi
 */
role.get("/getRole", getRole);

/**
 * @swagger
 * /role/getRoleById/{id}:
 *    get:
 *       summary: Rollarni ID bo'yicha olish
 *       tags: [Roles]
 *       description: Rollarni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Rolelarni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Rollar muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Rollar topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
role.get("/getRoleById/:id", getRoleById);

/**
 * @swagger
 * /role/updateRole/{id}:
 *    patch:
 *       summary: Rollarni yangilash
 *       tags: [Roles]
 *       description: Rol ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Rolelarning ID raqami
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
 *                         example: Teacher
 *       responses:
 *        '200':
 *         description: Rollar muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Rol topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.patch("/updateRole/:id",validateSchema(updateRoleValidationSchema), updateRole);

/**
 * @swagger
 * /role/deleteRole/{id}:
 *    delete:
 *      summary: Delete a Role by ID
 *      tags: [Roles]
 *      description: Delete a Role with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Roleto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Role deleted successfully
 *          "404":
 *             description: Role not found
 *          "500":
 *             description: Internal server error
 */
role.delete("/deleteRole/:id", deleteRole);


/**
 * @swagger
 * /role/searchRoles:
 *   get:
 *     summary: Rollarni qidirish
 *     tags:
 *       - Roles
 *     description: rol orqali Rollarni qidirish
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
 *         description: Rollar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
role.get("/searchRoles", searchRoles);


module.exports = { role }