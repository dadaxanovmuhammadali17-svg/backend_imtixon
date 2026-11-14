const { Router } = require("express");
const stage = Router();

const { addStage, getStage, getStageById, updateStage, deleteStage,searchStages } = require("../controllers/stage.controller");

const validateSchema = (schema) => (req, res, next) =>{
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
}

const {
   addStageValidationSchema,
   updateStageValidationSchema,
} = require("../validation/stageValidation")

/**
 * tags:
 *  name:Stages
 *  description: Rollar boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /stage/addStage:
 *    post:
 *       summary: Yangi Rol ro'yxatdan o'tkazish
 *       tags: [Stages]
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
 *             description: Stage muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */

stage.post("/addStage", validateSchema(addStageValidationSchema), addStage);

/**
 * @swagger
 * /stage/getStage:
 *    get:
 *       summary: Barcha Rollar olish
 *       tags: [Stages]
 *       description: Barcha Stagelar ro'yxatini olish
 *       responses:
 *           '200':
 *              description: Rollar ro'yxatini olish
 *           '500':
 *              description: Ichki server xatosi
 */
stage.get("/getStage", getStage);

/**
 * @swagger
 * /stage/getStageById/{id}:
 *    get:
 *       summary: Rollarni ID bo'yicha olish
 *       tags: [Stages]
 *       description: Rollarni ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Stagelarni olish uchun ID
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
stage.get("/getStageById/:id", getStageById);

/**
 * @swagger
 * /stage/updateStage/{id}:
 *    patch:
 *       summary: Rollarni yangilash
 *       tags: [Stages]
 *       description: Rol ma'lumotlarini yangilash
 *       parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Stagelarning ID raqami
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
stage.patch("/updateStage/:id",validateSchema(updateStageValidationSchema), updateStage);

/**
 * @swagger
 * /stage/deleteStage/{id}:
 *    delete:
 *      summary: Delete a Stage by ID
 *      tags: [Stages]
 *      description: Delete a Stage with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Stageto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Stage deleted successfully
 *          "404":
 *             description: Stage not found
 *          "500":
 *             description: Internal server error
 */
stage.delete("/deleteStage/:id", deleteStage);


/**
 * @swagger
 * /stage/searchStages:
 *   get:
 *     summary: Rollarni qidirish
 *     tags:
 *       - Stages
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
stage.get("/searchStages", searchStages);


module.exports = { stage }