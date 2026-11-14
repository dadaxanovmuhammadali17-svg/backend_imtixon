const { Router } = require("express")
const stuffs = Router();

const { postRegister, getStuffs, getStuffById, deleteStuffById, updatedStuff, searchStuffs, postLogin } = require("../controllers/stuff.controller");

const validateSchema = (schema) => (req, res, next) => {
   const validationResult = schema.validate(req.body);
   if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
   }
   next();
};

const {
   registerValidationSchema,
   updateStuffValidationSchema,
} = require("../validation/stuffValidation")

/**
 * tags:
 *  name: Stuffs
 *  description: Xodimlar boshqarish uchun API endpointlar
 */

/**
 * @swagger
 * /stuffs/register:
 *    post:
 *       summary: Yangi Xodim ro'yxatdan o'tkazish
 *       tags:
 *          - Stuffs
 *       description: Yangi Xodim yaratadi.
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                   type: object
 *                   required:
 *                      - login
 *                      - parol
 *                   properties:
 *                      login:
 *                         type: string
 *                         example: Stuff1
 *                      parol:
 *                         type: string
 *                         example: password123!
 *                      firstname:
 *                         type: string
 *                         example: John
 *                      lastname:
 *                         type: string
 *                         example: Doe
 *                      is_active:
 *                         type: boolean
 *                         example: true
 *                      phone_number:
 *                         type: string
 *                         example: +998901234567
 *       responses:
 *          201:
 *             description: Xodim muvaffaqiyatli yaratildi
 *          400:
 *             description: Yaroqsiz so'rov
 *          500:
 *             description: Ichki server xatosi
 */
stuffs.post("/register", validateSchema(registerValidationSchema), postRegister);

/**
 * @swagger
 * /stuffs/login:
 *    post:
 *       summary: Xodim tizimga kirishi
 *       tags: [Stuffs]
 *       description: Xodim kiritilgan ma'lumot bilan tizimga kiritish
 *       requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                type: object
 *                properties:
 *                   login:
 *                      type: string
 *                      description: Xodim elektron pochta manzili
 *                   parol:
 *                      type: string
 *                      description: Xodim paroli
 *       responses:
 *         200:
 *            description: Xodim muvaffaqiyatli tizimga kirdi
 *         401:
 *            description: Noto'g'ri ma'lumotlar
 *         500:
 *            description: Ichki server xatosi
 */
stuffs.post("/login", postLogin)

/**
 * @swagger
 * /stuffs/getStuffs:
 *    get:
 *      summary: Barcha Xodimlarni olish
 *      tags: [Stuffs]
 *      description: Barcha Xodimlar ro'yxatini olish
 *      responses:
 *          '200':
 *             description: Xodimlar ro'yxati muvaffaqiyatli qaytarildi
 *          '500':
 *             description: Ichki server xatosi
 */
stuffs.get("/getStuffs", getStuffs);

/**
 * @swagger
 * /stuffs/getStuffById/{id}:
 *    get:
 *       summary: Xodimlar ID bo'yicha olish
 *       tags: [Stuffs]
 *       description: Xodimlar ID bo'yicha olish
 *       parameters:
 *          - in: path
 *            name: id
 *            description: Xodimlarni olish uchun ID
 *            required: true
 *            schema:
 *              type: string
 *       responses:
 *          '200':
 *             description: Xodimlar muvaffaqiyatli qaytarildi
 *          '404':
 *             description: Xodim topilmadi
 *          '500':
 *             description: Ichki server xatosi
 */
stuffs.get("/getStuffById/:id", getStuffById)

/**
 * @swagger
 * /stuffs/updatedStuff/{id}:
 *   patch:
 *     summary: Xodimni yangilash
 *     tags:
 *       - Stuffs
 *     description: Xodim ma'lumotlarini yangilash
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Xodimning ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                  type: string
 *                  example: Stuff1
 *               parol:
 *                  type: string
 *                  example: password123!
 *               firstname:
 *                  type: string
 *                  example: John
 *               lastname:
 *                  type: string
 *                  example: Doe
 *               is_active:
 *                  type: boolean
 *                  example: true
 *               phone_number:
 *                  type: string
 *                  example: +998901234567
 *     responses:
 *       '200':
 *         description: Xodim muvaffaqiyatli yangilandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Xodim topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuffs.patch("/updatedStuff/:id", validateSchema(updateStuffValidationSchema), updatedStuff);

/**
 * @swagger
 * /stuffs/searchStuffs:
 *   get:
 *     summary: Xodimlarni qidirish
 *     tags:
 *       - Stuffs
 *     description: Ism yoki email orqali Xodimlarni qidirish
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
 *         description: Xodimlar topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
stuffs.get("/searchStuffs", searchStuffs);



/**
 * @swagger
 * /stuffs/deleteStuffById/{id}:
 *    delete:
 *      summary: Delete a Stuff by ID
 *      tags: [Stuffs]
 *      description: Delete a Stuff with the provided ID
 *      parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Stuffto delete
 *         required: true
 *         schema:
 *           type: string
 *      responses:
 *          "200":
 *             description: Stuff deleted successfully
 *          "404":
 *             description: Stuff not found
 *          "500":
 *             description: Internal server error
 */
stuffs.delete("/deleteStuffById/:id", deleteStuffById)

module.exports = { stuffs };