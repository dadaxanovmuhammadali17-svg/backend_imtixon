const { Router } = require("express");
const branch = Router();

const { addBranch, getBranch, getBranchById, updateBranch, deleteBranch, searchBranch } = require("../controllers/branch.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   addBranchValidationSchema,
   updateBranchValidationSchema,
} = require("../validation/branchValidation")

/**
 * tags:
 *  name:Branchs
 *  description: o'quv markazlarni boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /branch/addBranch:
 *    post:
 *       summary: Yangi O'quv markaz ro'yxatdan o'tkazish
 *       tags: [Branchs]
 *       description: Yangi O'quv markaz yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - name
 *                      - call_number
 *                   properties:
 *                      name:
 *                         type: string
 *                         example: Algoritm
 *                      address:
 *                         type: string
 *                         example: DXA yonida
 *                      call_number:
 *                         type: string
 *                         example: +998991119911
 *       responses:
 *          201:
 *             description: O'quv markaaz muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
branch.post("/addBranch", validateSchema(addBranchValidationSchema), addBranch);

/**
 * @swagger
 * /branch/getBranch:
 *    get:
 *       summary: Barcha O'quv markazlar ro'yxatini olish
 *       tags: [Branchs]
 *       description: Barcha O'quv markazlar ro'yxatini olish
 *       responses:
 *            '200':
 *                description: O'quv markazlar ro'yxati olish
 *            '500':
 *                description: Ichki server xatosi
 */
branch.get("/getBranch", getBranch);

/**
 * @swagger
 * /branch/getBranchById/{id}:
 *    get:
 *       summary: O'quv markaz ID bo'yicha olish
 *       tags: [Branchs]
 *       description: O'quv markaz ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: O'quv markazni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: O'quv markazlar muvaffaqiyatli qaytarildi
 *          '404':
 *             description: O'quv markazlar topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
branch.get("/getBranchById/:id", getBranchById);

/**
 * @swagger
 * /Branch/updateBranch/{id}:
 *    patch:
 *       summary: Branchlarni yangilash
 *       tags: [Branchs]
 *       description: Branch ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Branchlarning ID raqami
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
 *                         example: Algoritm
 *                      address:
 *                         type: string
 *                         example: DXA yonida
 *                      call_number:
 *                         type: string
 *                         example: +998991119911
 *       responses:
 *        '200':
 *         description: Branchlar muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Branch topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.patch("/updateBranch/:id", validateSchema(updateBranchValidationSchema), updateBranch);

/**
 * @swagger
 * /branch/deleteBranch/{id}:
 *    delete:
 *      summary: Delete a Branch by ID
 *      tags: [Branchs]
 *      description: Delete a Branch with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the userto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Branch deleted successfully
 *          "404":
 *             description: Branch not found
 *          "500":
 *             description: Internal server error
 */
branch.delete("/deleteBranch/:id", deleteBranch);

/**
 * @swagger
 * /branch/searchBranch:
 *   get:
 *     summary: Branchni qidirish
 *     tags:
 *       - Branchs
 *     description: Nom yoki manzil orqali Branchni qidirish
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
 *         description: Foydalanuvchilar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
branch.get("/searchBranch", searchBranch);

module.exports = { branch }