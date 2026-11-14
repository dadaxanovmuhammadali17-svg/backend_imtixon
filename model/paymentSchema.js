const { Schema, model } = require("mongoose");
const { Student } = require("./studentSchema");

const paymentSchema = new Schema({
   student_id: { type: Schema.Types.ObjectId, ref: Student, default: null },
   payment_last_date: { type: String, default: "" },
   payment_date: { type: String, default: "" },
   price: { type: String, default: "" },
   is_paid: { type: String, default: "" },
   total_attent: { type: String, default: "" }
});
const Payment = model("Payment", paymentSchema);
module.exports = { Payment };