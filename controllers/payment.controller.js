const { Payment } = require("../model/paymentSchema");

// -------------add Payment------------
const addPayment = async (req, res) => {
   try {
      const { student_id, payment_last_date, payment_date, price, is_paid, total_attent } = req.body;

      const newPayment = new Payment({
         student_id,
         payment_last_date,
         payment_date,
         price,
         is_paid,
         total_attent
      });

      await newPayment.save();
      res.status(201).json({ success: true, message: "Payment successfully added", data: newPayment });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while adding Payment" });
   }
};

// -------------------Get Payment---------------
const getPayment = async (req, res) => {
   try {
      const payments = await Payment.find().populate("student_id");
      if (!payments || payments.length === 0) {
         return res.status(404).json({ success: false, message: "Payment not found" });
      }
      res.status(200).json({ success: true, message: "All payments fetched", data: payments });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while fetching payment" });
   }
};

// ----------------get Payment by ID -----------------------
const getPaymentById = async (req, res) => {
   try {
      const { id } = req.params;

      const payment = await Payment.findById(id).populate("student_id");
      if (!payment) {
         return res.status(404).json({ success: false, message: "Payment not found" });
      }
      res.status(200).json({ success: true, message: "Payment fetched", data: payment });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while fetching payment" });
   };
};

// --------------update Payment---------------
const updatePayment = async (req, res) => {
   try {
      const { id } = req.params;
      const { student_id, payment_last_date, payment_date, price, is_paid, total_attent } = req.body;

      const updatedPayment = await Payment.findByIdAndUpdate(
         id,
         { student_id, payment_last_date, payment_date, price, is_paid, total_attent },
         { new: true }
      ).populate("student_id");

      if (!updatedPayment) {
         return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.status(200).json({ success: true, message: "Payment updated successfully", data: updatedPayment });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error while updating Payment" });
   }
};


// ------------delete Payment----------------
const deletePayment = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedPayment = await Payment.findByIdAndDelete(id);

      if (!deletedPayment) {
         return res.status(404).json({ success: false, message: "Payment not found" });
      }

      res.status(200).json({ success: true, message: "Payment deleted successfully" });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

module.exports = {
   addPayment,
   getPayment,
   getPaymentById,
   updatePayment,
   deletePayment
};