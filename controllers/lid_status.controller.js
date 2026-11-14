const { Lid_status } = require("../model/lid_statusSchema");

//--------------------Add Lid_status---------------
const addLid_status = async (req, res) => {
   try {
      const {
         name,
      } = req.body;
      const newLid_status = new Lid_status({
         name,
      });
      await newLid_status.save();
      res.status(201).json({ succes: true, message: "Lid_status succesfully added", innder_data: newLid_status });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ succes: false, message: "Internal server error while adding Lid_status" });
   }
};

//--------------------Get Lid_status--------------------------
const getLid_status = async (req, res) => {
   try {
      const lid_statuses = await Lid_status.find();
      if (!lid_statuses) {
         return res.status(404).json({ succes: false, message: "404 not found: Lid_statuses not found" });
      }
      res.status(200).json({ succes: true, message: "All Lid_statuses fetched", innder_data: lid_statuses });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lid_statuses" });
   }
};

//---------------Get Lid_status by id-------------
const getLid_statusById = async (req, res) => {
   try {
      const { id } = req.params;

      const lid_status = await Lid_status.findById(id);
      if (!lid_status) {
         return res.status(404).json({ success: false, message: "404 not found: Lid_status not found" });
      }
      res.status(200).json({ success: true, message: "Lid_status fetched", innder_data: lid_status });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal server error while fetching Lid_status" });
   }
};

//--------------------------Update Lid_status----------------------
const updateLid_status = async (req, res) => {
   try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedLid_status = await Lid_status.findByIdAndUpdate(
         id,
         { name },
         { returnDocument: "after" }
      );

      if (!updatedLid_status) {
         return res.status(404).json({
            success: false,
            message: "Lid_status not found"
         });
      }

      res.status(200).json({
         success: true,
         message: "Lid_status updated successfully",
         inner_data: updatedLid_status
      });
   } catch (err) {
      console.error(err.message);
      res.status(500).json({
         message: "Internal server error while updating Lid_status"
      });
   }
};

//-----------------Delete Lid_status-------------------------
const deleteLid_status = async (req, res) => {
   try {
      const { id } = req.params;
      const deletedLid_status = await Lid_status.findByIdAndDelete(id);
      if (deletedLid_status) {
         res.status(200).json({ success: true, message: "Lid_status deleted succesfully" });
      } else {
         res.status(404).json({ success: false, message: "Lid_status not found" });
      }
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Internal server error" });
   }
};

//---------------- search Lid_status----------------
const searchLid_status = async (req, res) => {
   try {
      const { query } = req.query;

      if (!query || typeof query != "string") {
         return res.status(400).json({ message: "Invalid search query" });
      }

      const result = await Lid_status.find({
         $or: [
            { name: { $regex: query, $options: "i" } },
         ]
      });

      if (result.length === 0) {
         return res.json({ message: "Bunday Lid_status topilmadi" });
      }
      res.json(result);
   } catch (err) {
      console.error("Error fetching Lid_statuses:", err);
      res.status(500).json({ message: "Server error: Failed to fetch Lid_statuses" });
   }
};

module.exports = {
   addLid_status,
   getLid_status,
   getLid_statusById,
   updateLid_status,
   deleteLid_status,
   searchLid_status,
};
