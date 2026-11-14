
const { Router } = require("express");
const payment = Router();

const {
  addPayment,
  getPayment,
  getPaymentById,
  updatePayment,
  deletePayment
} = require("../controllers/payment.controller");

const validationSchema = (schema) => (req, res, next) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res.status(400).send(validationResult.error.details[0].message);
  }

  next();
};

const {
  createPaymentValidationSchema,
  updatePaymentValidationSchema,
} = require("../validation/paymentValidation");

/**
 * @swagger
 * tags:
 *   - name: Payment
 *     description: Payment uchun API endpointlar
 */

/**
 * @swagger
 * /payment/addPayment:
 *   post:
 *     summary: Yangi Payment qo'shish
 *     tags: [Payment]
 *     description: Yangi Payment yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *               payment_date:
 *                 type: string
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       201:
 *         description: Payment muvaffaqiyatli qo'shildi
 *       400:
 *         description: Noto'g'ri ma'lumot yuborildi
 *       500:
 *         description: Ichki server xatosi
 */
payment.post(
  "/addPayment",
  validationSchema(createPaymentValidationSchema),
  addPayment
);

/**
 * @swagger
 * /payment/getPayment:
 *   get:
 *     summary: Barcha Payment larni olish
 *     tags: [Payment]
 *     description: Barcha Payment lar ro'yxatini olish
 *     responses:
 *       200:
 *         description: Payment lar ro'yxati muvaffaqiyatli qaytarildi
 *       500:
 *         description: Ichki server xatosi
 */
payment.get("/getPayment", getPayment);

/**
 * @swagger
 * /payment/getPaymentById/{id}:
 *   get:
 *     summary: Payment ni ID bo'yicha olish
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID si
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment muvaffaqiyatli qaytarildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
payment.get("/getPaymentById/:id", getPaymentById);

/**
 * @swagger
 * /payment/updatePayment/{id}:
 *   put:
 *     summary: Payment ni yangilash
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Payment ID raqami
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_id:
 *                 type: string
 *               payment_last_date:
 *                 type: string
 *               payment_date:
 *                 type: string
 *               price:
 *                 type: number
 *               is_paid:
 *                 type: boolean
 *               total_attent:
 *                 type: number
 *     responses:
 *       200:
 *         description: Payment muvaffaqiyatli yangilandi
 *       400:
 *         description: Validatsiya xatosi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
payment.put(
  "/updatePayment/:id",
  validationSchema(updatePaymentValidationSchema),
  updatePayment
);

/**
 * @swagger
 * /payment/deletePayment/{id}:
 *   delete:
 *     summary: Payment ni ID orqali o'chirish
 *     tags: [Payment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O'chiriladigan Payment ID raqami
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment muvaffaqiyatli o'chirildi
 *       404:
 *         description: Payment topilmadi
 *       500:
 *         description: Ichki server xatosi
 */
payment.delete("/deletePayment/:id", deletePayment);

module.exports = { payment };
